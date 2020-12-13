import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, propTypes, getFormValues } from 'redux-form';
import ResistancesView from './ResistancesView';
//import '../style.css';

class ResistancesContainer extends Component {

    componentWillMount() {
        this.props.initialize({
            health: 5000,
            resistance: 25,
            spellPen: 0,
            spellHit: 0,
            attackerLevel: 63,
            targetLevel: 60,
            binarySpell: false,
            attackerIsNpc: true,
            targetIsNpc: false,
            spellBaseDmg: 510,
            spellPowerCoefficient: 6/7,
            spellPower: 500,
        });
    }

    computeResistanceStats(resistance) {
        const attackerLevel = +this.props.formValues.attackerLevel;
        const targetLevel = +this.props.formValues.targetLevel;
        const binarySpell = +this.props.formValues.binarySpell;
        const attackerIsNpc = +this.props.formValues.attackerIsNpc;
        const targetIsNpc = +this.props.formValues.targetIsNpc;
        const spellPen = +this.props.formValues.spellPen;

        const resistanceCap = Math.max(5 * attackerLevel, 100);
        const levelBasedResistance =
              !binarySpell && !attackerIsNpc && targetIsNpc
            ? 8 * Math.max(0, targetLevel - attackerLevel)
            : 0;
        const effectiveResistance = Math.max(0, resistance - spellPen) + levelBasedResistance;
        const resistanceRatio = Math.min(1, effectiveResistance / resistanceCap);
        const avgMit = resistanceRatio * 0.75 - (binarySpell ? 0 : 1) * 3.0 / 16.0 * Math.max(0, resistanceRatio - 2.0 / 3.0);

        return {
            avgMit,
            levelBasedResistance,
            effectiveResistance,
            resistanceCap,
            resistanceRatio,
        };
    }

    avgMit(resistance) {
        return this.computeResistanceStats(resistance).avgMit;
    }

    computeResistanceTable() {
        const health = +this.props.formValues.health;
        const averages = [];
        const outcomes = [];
        for (let resistance = 0; resistance <= 315; resistance += 5) {
            const stats = this.computeResistanceStats(resistance);
            const reduction = stats.avgMit;
            averages.push({
                resistance,
                'avg mitigation %': +(reduction * 100).toFixed(2),
                effectiveHP: Math.round(health / (1 - reduction)),
            });

            let resistOutcomes = Object.fromEntries(this.computeResistOutcomes(stats.resistanceRatio, value => (value * 100).toFixed(2)));
            resistOutcomes['resistance'] = resistance;
            outcomes.push(resistOutcomes);
        }

        return {
            averages,
            outcomes,
        }
    }

    computeResistOutcomes(resistanceRatio, formatter=(value=>value)) {
        const binarySpell = +this.props.formValues.binarySpell;

        if (isNaN(resistanceRatio)) {
            return [];
        }

        if (binarySpell) {
            const mit = resistanceRatio * 0.75;
            return [
                ['Resist (no effect)', formatter(mit)],
                ['Hit (full effect)', formatter(1 - mit)],
            ]
        }

        const regressionSegments = [
            [100, 0, 0, 0],     // 0
            [24, 55, 18, 3],    // 1/3
            [0, 22, 56, 22],    // 2/3
            [0, 4, 16, 80],     // 1
        ]
        const i = Math.floor(resistanceRatio * 3);
        const frac = resistanceRatio * 3 - i;

        let percentages = [];
        if (i >= 3) {
            percentages = regressionSegments[3]
        }
        else {
            for (let k = 0; k < 4; k++) {
                percentages.push(regressionSegments[i][k] * (1 - frac) + regressionSegments[i+1][k] * frac);
            }

            if (resistanceRatio < 2/3 - 1e-6) {
                percentages[0] = Math.max(1, percentages[0]);
            }
        }

        const result = []
        for (let k = 0; k < 4; k++) {
            result.push([(25 * k) + '% resist', formatter(percentages[k] / 100)]);
        }
        return result;
    }

    avgDamage(spellPower, addedSpellPen, hitPercent) {
        const spellBaseDmg = +this.props.formValues.spellBaseDmg;
        const spellPowerCoefficient = +this.props.formValues.spellPowerCoefficient
        const resistance = +this.props.formValues.resistance;

        return (spellBaseDmg + spellPower * spellPowerCoefficient) * (1 - this.avgMit(resistance - addedSpellPen)) * (hitPercent / 100.0);
    }

    computeResistance() {
        const resistance = +this.props.formValues.resistance;
        const baseHealth = +this.props.formValues.health;
        const attackerLevel = +this.props.formValues.attackerLevel;
        const targetLevel = +this.props.formValues.targetLevel;
        const attackerIsNpc = +this.props.formValues.attackerIsNpc;
        const targetIsNpc = +this.props.formValues.targetIsNpc;

        const stats = this.computeResistanceStats(resistance);
        const mit = stats.avgMit;
        const resistanceRatio = stats.resistanceRatio;
        const resistOutcomes = this.computeResistOutcomes(resistanceRatio, value => (value * 100).toFixed(0));

        const effectiveHealth = baseHealth / (1 - mit);
        const damageReduction = (mit * 100).toFixed(2);
        const effectiveHealthWithTenMoreHealth = (baseHealth + 10) / (1 - mit);
        const effectiveHealthWithOneMoreResistance = baseHealth / (1 - this.avgMit(resistance+1));
        const mitValueOfOneResist = ((this.avgMit(resistance+1) - mit) * 100).toFixed(2);
        const ehpValueOfTenHealth = (effectiveHealthWithTenMoreHealth - effectiveHealth).toFixed(2);
        const ehpValueofOneResist = (effectiveHealthWithOneMoreResistance - effectiveHealth).toFixed(2);

        const pvp = !attackerIsNpc && !targetIsNpc;
        const levelDifference = targetLevel - attackerLevel;

        const spellHit = +this.props.formValues.spellHit;
        const baseMissPercent = Math.max(1, Math.min(90,
            4 + levelDifference +
                Math.max(0, levelDifference - 2) * (pvp ? 6 : 10)
        ));
        const missPercent = Math.max(1, baseMissPercent - spellHit);
        const hitPercent = 100 - missPercent;

        const overallMitigationIncludingSpellHit = 1 - (hitPercent / 100.0) * (1 - mit);

        const spellPower = +this.props.formValues.spellPower;
        const dmg = this.avgDamage(spellPower, 0, hitPercent);
        const dmgWithPlusOneSpellPower = this.avgDamage(spellPower + 1, 0, hitPercent) - dmg;
        const dmgWithPlusOneSpellPen = this.avgDamage(spellPower, 1, hitPercent) - dmg;
        const dmgWithPlusOneSpellHit = this.avgDamage(spellPower, 0, Math.min(99, hitPercent + 1)) - dmg;
        //console.log(dmgWithPlusOneSpellPower + '\n' + dmgWithPlusOneSpellPen + '\n' + dmgWithPlusOneSpellHit);
        const spellPenValue = (dmgWithPlusOneSpellPen / dmgWithPlusOneSpellPower).toFixed(2);
        const spellHitValue = (dmgWithPlusOneSpellHit / dmgWithPlusOneSpellPower).toFixed(2);

        return {
            resistance,
            baseHealth: Math.round(baseHealth),
            damageReduction,
            levelBasedResistance: stats.levelBasedResistance,
            effectiveResistance: stats.effectiveResistance,
            resistanceCap: stats.resistanceCap,
            resistancePercent: (resistanceRatio * 100).toFixed(2),
            effectiveHealth: Math.round(effectiveHealth) || 0,
            mitValueOfOneResist,
            ehpValueOfTenHealth,
            ehpValueofOneResist,
            resistOutcomes,
            missPercent,
            hitPercent,
            overallMitigationIncludingSpellHit: (overallMitigationIncludingSpellHit*100).toFixed(2),
            spellPenValue,
            spellHitValue,
        };
    }

    setPvp() {
        this.props.change('attackerLevel', 60);
        this.props.change('targetLevel', 60);
        this.props.change('attackerIsNpc', false);
        this.props.change('targetIsNpc', false);
        return true;
    }

    setBvp() {
        this.props.change('attackerLevel', 63);
        this.props.change('targetLevel', 60);
        this.props.change('attackerIsNpc', true);
        this.props.change('targetIsNpc', false);
        return true;
    }

    setPvb() {
        this.props.change('attackerLevel', 60);
        this.props.change('targetLevel', 63);
        this.props.change('attackerIsNpc', false);
        this.props.change('targetIsNpc', true);
        return true;
    }

    getClickHandlers() {
        return {
            setPvp: this.setPvp.bind(this),
            setBvp: this.setBvp.bind(this),
            setPvb: this.setPvb.bind(this),
        }
    }
    render() {
        return (
                <ResistancesView
            formValues={ this.props.formValues }
            resistancesTable={ this.computeResistanceTable() }
            resistances={ this.computeResistance() }
            clickHandlers={ this.getClickHandlers() }
                />
        );
    }
}

ResistancesContainer.defaultProps = {
    formValues: {},
};

const mapStateToProps = state => {
    return {
        formValues: getFormValues('ResistancesContainer')(state),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
    }, dispatch),
});

ResistancesContainer.propTypes = propTypes;

export default reduxForm({ form: 'ResistancesContainer' })(connect(mapStateToProps, mapDispatchToProps)(ResistancesContainer));
