import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { NavLink } from 'react-router-dom';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Helmet } from 'react-helmet';
// import { routeCodes } from '../../views/App';

const chartColors = ['blue', 'red', 'orange', 'green'];
const resistanceTicks = [];
for (let i = 0; i <= 315; i += 35) { resistanceTicks.push(i); }

function WithTooltip(props) {
  return <span data-tooltip aria-haspopup='true' className='has-tip tip-bottom' title={props.tooltip}>{props.children} &#9432;</span>
}
function TextWithTooltip(props) {
  return <WithTooltip tooltip={props.tooltip}>{props.text}</WithTooltip>
}

const resistancesView = ({
  resistancesTable,
  resistances,
  clickHandlers,
}) => (
  <div>
    <Helmet>
      <title>Resistance Calculator</title>
    </Helmet>
    <div>
      <div className='row columns'>
        <nav aria-label='You are here:'>
          <ul className='breadcrumbs'>
            <li><NavLink to="/">Legacy Sim</NavLink></li>
            <li><span className='show-for-sr'>Current:</span> Resistances</li>
          </ul>
        </nav>
      </div>
      <div className='row columns'>
        <h3>Resistances</h3>
      </div>

      <div className='row columns'>
        <p>See <a href='https://royalgiraffe.github.io/resist-guide' >my guide on resistance mechanics</a> for more information about the calculations here.</p>
      </div>

      <div className='row'>
        <div className='large-6 columns'>
          <label>Quick scenario presets</label>
          <button onClick={clickHandlers.setBvp} className="button primary">Boss attacking player</button>
          <button onClick={clickHandlers.setPvb} className="button primary">Player attacking boss</button>
          <button onClick={clickHandlers.setPvp} className="button primary">PvP</button>
        </div>
        <div className='large-2 medium-3 columns end'>
          <label htmlFor='targetLevel'>Target Level
            <Field name='targetLevel' component='input' type='number' min='0' max='63' />
          </label>
        </div>
        <div className='large-2 medium-3 columns end'>
          <label htmlFor='attackerLevel'>Attacker Level
            <Field name='attackerLevel' component='input' type='number' min='0' max='63' />
          </label>
        </div>
        <div className='large-2 medium-6 columns end'>
          <div>
            <Field name='targetIsNpc' id='targetIsNpc' component='input' type='checkbox' />
            <label htmlFor='targetIsNpc'>
              Target is NPC
            </label>
          </div>
          <div>
            <Field name='attackerIsNpc' id='attackerIsNpc' component='input' type='checkbox' />
            <label htmlFor='attackerIsNpc'>
              Attacker is NPC
            </label>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='large-2 columns'>
          <Field name='binarySpell' id='binarySpell' component='input' type='checkbox' />
          <label htmlFor='binarySpell'>
            <TextWithTooltip text='Binary Spell' tooltip="If the spell has a non-damaging effect, e.g. Frostbolt (slow) or Firemaw's Flame Buffet (stacking debuff), it is a binary spell. If the spell only deals damage, e.g. Fireball, Shadow Bolt, or Sapphiron's Frost Aura, it is a non-binary spell. See guide for more info." />
          </label>
        </div>
        <div className='large-2 medium-3 columns'>
          <label htmlFor='resistance'>
            <TextWithTooltip text="Resistance" tooltip="Target's Resistance score, including any buffs and debuffs" />
            <Field name='resistance' component='input' type='number' min='0' max='315' />
          </label>
        </div>
        <div className='large-2 medium-3 columns'>
          <label htmlFor='health'>Target Health
            <Field name='health' component='input' type='number' min='0' />
          </label>
        </div>
        <div className='large-2 medium-3 columns'>
          <label htmlFor='spellPen'> <TextWithTooltip tooltip="Attacker's Spell Penetration" text="Spell Penetration" />
            <Field name='spellPen' component='input' type='number' min='0' max='1000' />
          </label>
        </div>
        <div className='large-2 medium-3 columns end'>
          <label htmlFor='spellHit'> <TextWithTooltip tooltip="Attacker's Spell Hit bonus" text="+Spell Hit" />
            <Field name='spellHit' component='input' type='number' min='0' max='100' />
          </label>
        </div>
      </div>

      <div className='row columns'>
        <h4>Average resistance values</h4>
        <div className='row'>
          <div className='columns'>
            <div className='row'>
              <div className='medium-8 large-6 columns'>
                <ResponsiveContainer aspect={ 2 } >
                  <ComposedChart data={ resistancesTable.averages } margin={ { top: 10, right: 0, left: 0, bottom: 0 } } >
                    <Line dataKey='Avg Mitigation %' stroke='blue' isAnimationActive={ false } dot={ false } />
                    <Line dataKey='Effective HP' yAxisId='1' stroke='green' isAnimationActive={ false } dot={ false } />
                    <XAxis dataKey='resistance' ticks={resistanceTicks} />
                    <YAxis domain={[0,75]} ticks={[0,25,50,75]} />
                    <YAxis yAxisId='1' orientation='right' />
                    <Legend />
                    <Tooltip isAnimationActive={ false } />
                    <CartesianGrid strokeDasharray='3 3' />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              
              <div className='medium-4 large-6 columns'>
                <table>
                  <tbody>
                    <tr>
                      <td>Avg Damage Mitigation</td>
                      <td>{resistances.damageReduction}%</td>
                    </tr>
                    <tr>
                      <td><TextWithTooltip text='Effective HP' tooltip="The amount of raw damage before resists that would, on average, after resists, be equal to the target's HP" /></td>
                      <td>{resistances.effectiveHealth}</td>
                    </tr>
                    <tr>
                      <td>Avg Mitigation value per Resistance</td>
                      <td>{resistances.mitValueOfOneResist}%</td>
                    </tr>
                    <tr>
                      <td>EHP value per Resistance</td>
                      <td>{resistances.ehpValueofOneResist}</td>
                    </tr>
                    <tr>
                      <td>EHP value per Stamina</td>
                      <td>{resistances.ehpValueOfTenHealth}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <h4>Resist roll outcomes</h4>
        <p>The chances of each type of partial resist are estimated to within a few percent accuracy. The true values may also differ slightly due to rounding effects.</p>

        <div className='row'>
          <div className='medium-8 large-6 columns'>
            <ResponsiveContainer aspect={ 2 } >
              <ComposedChart data={ resistancesTable.outcomes } margin={ { top: 10, right: 0, left: 0, bottom: 0 } } >
                {
                resistances.resistOutcomes.map((row, index) =>(
                <Line dataKey={row[0]} key={row[0]} stroke={chartColors[index]} isAnimationActive={ false } dot={ false } />
                ))
                }
                <XAxis dataKey='resistance' ticks={resistanceTicks} />
                <YAxis ticks={[0,25,50,75,100]} />
                <Legend />
                <Tooltip isAnimationActive={ false } />
                <CartesianGrid strokeDasharray='3 3' />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className='medium-4 large-6 columns'>
            <table>
              <tbody>
                {
                resistances.resistOutcomes.map((row) =>(
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <td>{row[1]}%</td>
                </tr>
                ))
                }
              </tbody>
            </table>
          </div>
        </div>

        <div className='row'>
          <div className='medium-6 columns'>
            <h4>Resist calculation details</h4>
            <table>
              <tbody>
                <tr>
                  <td>
                    <TextWithTooltip text='NPC level-based resistance' tooltip='When a player is casting a non-binary spell at an NPC of higher level, the NPC gains 8 resistance per level above the player, which cannot be reduced by anything (spell pen or curses).' />
                  </td>
                  <td>{resistances.levelBasedResistance}</td>
                </tr>
                <tr>
                  <td><TextWithTooltip text='Effective resistance' tooltip='Resistance after subtracting Spell Penetration and adding NPC level-based resistance' /></td>
                  <td>{resistances.effectiveResistance}</td>
                </tr>
                <tr>
                  <td><TextWithTooltip text='Resistance cap' tooltip='Resistance scores above the cap are the same as the cap and do not provide any additional benefit.' /></td>
                  <td>{resistances.resistanceCap}</td>
                </tr>
                <tr>
                  <td> <TextWithTooltip text='Resistance % of cap' tooltip='This value determines the spell resist table, i.e. the chance of each possible resist outcome' /> </td>
                  <td>{resistances.resistancePercent}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className='medium-6 columns'>
            <h4>Spell hit/miss roll</h4>
            <p> This roll is based on the level difference and Spell Hit bonus. It is separate roll from the resistance score roll. </p>
            <table>
              <tbody>
                <tr>
                  <td> <TextWithTooltip text='Spell hit chance' tooltip='On hit, the spell then makes a resist roll.' /> </td>
                  <td> {resistances.hitPercent}% </td>
                </tr>
                <tr>
                  <td> Spell miss chance </td>
                  <td> {resistances.missPercent}% </td>
                </tr>
                <tr>
                  <td> <WithTooltip tooltip='Including both spell hit/miss roll and resistance score roll'>Overall { resistances.binarySpell ? "chance of resist" : "average resistance" }</WithTooltip> </td>
                  <td> { resistances.overallMitigationIncludingSpellHit }% </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h4>Spell pen and spell hit values</h4>

        <div className='row'>
          <div className='large-3 medium-4 columns'>
            <div>
              <label htmlFor='spellBaseDmg'>Spell base damage
                <Field name='spellBaseDmg' component='input' type='number' min='0' />
              </label>
            </div>
            <div>
              <label htmlFor='spellPower'>Spell power
                <Field name='spellPower' component='input' type='number' min='0' />
              </label>
            </div>
            <div>
              <label htmlFor='spellPowerCoefficient'>Spell power coefficient
                <Field name='spellPowerCoefficient' component='input' type='number' min='0' max='1' />
              </label>
            </div>
          </div>
          
          <div className='medium-6 columns end'>
            <p>Stat values, in equivalent Spell Power (this depends on both your spell damage/power values and the resistance/level values at the top).</p>
            <table>
              <tbody>
                <tr>
                  <td>Spell Penetration value</td>
                  <td>{resistances.spellPenValue}</td>
                </tr>
                <tr>
                  <td>Spell Hit value</td>
                  <td>{resistances.spellHitValue}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  </div>
);

resistancesView.propTypes = {
  resistancesTable: PropTypes.any,
  resistances: PropTypes.any,
  clickHandlers: PropTypes.any,
};

export default resistancesView;
