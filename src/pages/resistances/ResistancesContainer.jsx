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
      resistance: 150,
      attackerLevel: 63,
    });
  }

  avgMit(resistance, attackerLevel) {
    const resistanceRatio = Math.min(1, resistance / Math.max(5 * attackerLevel, 100));
    const mit = resistanceRatio * 0.75 - 3.0 / 16.0 * Math.max(0, resistanceRatio - 2.0 / 3.0);
    return mit;
  }

  computeResistanceTable() {
    const health = +this.props.formValues.health;
    const attackerLevel = +this.props.formValues.attackerLevel;
    const resistances = [];
    for (let resistance = 0; resistance <= 315; resistance += 5) {
      const reduction = this.avgMit(resistance, attackerLevel);
      resistances.push({
        resistance,
        'avg mitigation %': +(reduction * 100).toFixed(2),
        effectiveHP: Math.round(health / (1 - reduction)),
      });
    }
    return resistances;
  }

  computeResistance() {
    const resistance = +this.props.formValues.resistance;
    const baseHealth = +this.props.formValues.health;
    const attackerLevel = +this.props.formValues.attackerLevel;

    const mit = this.avgMit(resistance, attackerLevel);
    const effectiveHealth = baseHealth / (1 - mit);
    const damageReduction = (mit * 100).toFixed(2);
    const effectiveHealthWithTenMoreHealth = (baseHealth + 10) / (1 - mit);
    const effectiveHealthWithOneMoreResistance = baseHealth / (1 - this.avgMit(resistance+1, attackerLevel));
    const mitValueOfOneResist = ((this.avgMit(resistance+1, attackerLevel) - mit) * 100).toFixed(2);
    const ehpValueOfTenHealth = (effectiveHealthWithTenMoreHealth - effectiveHealth).toFixed(2);
    const ehpValueofOneResist = (effectiveHealthWithOneMoreResistance - effectiveHealth).toFixed(2);

    return {
      resistance,
      baseHealth: Math.round(baseHealth),
      damageReduction,
      effectiveHealth: Math.round(effectiveHealth) || 0,
      mitValueOfOneResist,
      ehpValueOfTenHealth,
      ehpValueofOneResist,
    };
  }

  render() {
    return (
      <ResistancesView
        formValues={ this.props.formValues }
        resistancesTable={ this.computeResistanceTable() }
        resistances={ this.computeResistance() }
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
