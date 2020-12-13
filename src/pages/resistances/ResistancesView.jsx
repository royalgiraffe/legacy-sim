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
// import { routeCodes } from '../../views/App';

const chartColors = ['blue', 'red', 'orange', 'green'];
const resistanceTicks = [];
for (let i = 0; i <= 315; i += 35) { resistanceTicks.push(i); }
 
const resistancesView = ({
  resistancesTable,
  resistances,
}) => (
  <div>
    <div>
      <div className='row columns'>
        <nav aria-label='You are here:'>
          <ul className='breadcrumbs'>
            <li><NavLink to="/">Home</NavLink></li>
            <li><span className='show-for-sr'>Current:</span> Resistances</li>
          </ul>
        </nav>
      </div>
      <div className='row'>
        <h3>Resistances</h3>
      </div>

      <div className='row'>
        <div className='large-3 medium-4 columns'>
          <div>
            <label htmlFor='resistance'> Target Resistance
              <Field name='resistance' component='input' type='number' min='0' max='315' />
            </label>
          </div>
          <div>
            <label htmlFor='health'>Target Health
              <Field name='health' component='input' type='number' min='0' />
            </label>
          </div>
          <div>
            <label htmlFor='targetLevel'>Target Level
              <Field name='targetLevel' component='input' type='number' min='0' max='63' />
            </label>
          </div>
        </div>

        <div className='large-3 medium-4 columns'>
          <div>
            <label htmlFor='spellPen'> Attacker Spell Penetration
              <Field name='spellPen' component='input' type='number' min='0' max='1000' />
            </label>
          </div>
          <div>
            <label htmlFor='spellHit'> Attacker +Spell Hit
              <Field name='spellHit' component='input' type='number' min='0' max='100' />
            </label>
          </div>
          <div>
            <label htmlFor='attackerLevel'>Attacker Level
              <Field name='attackerLevel' component='input' type='number' min='0' max='63' />
            </label>
          </div>
        </div>

        <div className='large-3 medium-4 columns end'>
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
          <div>
            <Field name='binarySpell' id='binarySpell' component='input' type='checkbox' />
            <label htmlFor='binarySpell'>
              <span data-tooltip aria-haspopup='true' className='has-tip tip-bottom' title='If the spell has a non-damaging effect, e.g. Frostbolt or Fear, it is a binary spell. If the spell only deals damage, e.g. Fireball or Shadow Bolt, it is a non-binary spell.'>
                Binary Spell
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='columns'>
          <h4>Average resistance values</h4>

          <div className='row'>
            <div className='medium-8 large-6 columns'>
              <ResponsiveContainer aspect={ 2 } >
                <ComposedChart data={ resistancesTable.averages } margin={ { top: 10, right: 0, left: 0, bottom: 0 } } >
                  <Line dataKey='avg mitigation %' stroke='blue' isAnimationActive={ false } dot={ false } />
                  <Line dataKey='effectiveHP' yAxisId='1' stroke='green' isAnimationActive={ false } dot={ false } />
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
                    <td>Effective HP</td>
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

      <div className='row'>
        <div className='columns'>
          <h4>Resist roll outcomes</h4>
          <p>The chances of each type of partial resist are estimated and likely accurate within a few percent. The true values may also differ due to rounding effects.</p>

          <div className='row'>
            <div className='medium-8 large-6 columns'>
              <ResponsiveContainer aspect={ 2 } >
                <ComposedChart data={ resistancesTable.outcomes } margin={ { top: 10, right: 0, left: 0, bottom: 0 } } >
                  {
                  resistances.resistOutcomes.map((row, index) =>(
                  <Line dataKey={row[0]} stroke={chartColors[index]} isAnimationActive={ false } dot={ false } />
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
                  <tr>
                    <td>{row[0]}</td>
                    <td>{row[1]}%</td>
                  </tr>
                  ))
                  }
                </tbody>
              </table>
            </div>
          </div>

          <h4>Resist calculation details</h4>
          <table>
            <tbody>
              <tr>
                <td>
                  <span data-tooltip aria-haspopup='true' className='has-tip tip-bottom' title='When a player is casting a non-binary spell at an NPC of higher level, the NPC gains 8 resistance per level above the player, which cannot be reduced by Spell Penetration.'>
                    Level-based resistance
                  </span>
                </td>
                <td>{resistances.levelBasedResistance}</td>
              </tr>
              <tr>
                <td>Effective resistance</td>
                <td>{resistances.effectiveResistance}</td>
              </tr>
              <tr>
                <td>Resistance cap</td>
                <td>{resistances.resistanceCap}</td>
              </tr>
              <tr>
                <td>Resistance % of cap</td>
                <td>{resistances.resistancePercent}%</td>
              </tr>
            </tbody>
          </table>

          <h4>Spell hit/miss roll</h4>
          <p>
            Spell hit chance: {resistances.hitPercent}%, miss chance: {resistances.missPercent}%. This is a separate roll from the resistance roll, and multiplies with all of the mitigation figures above for the resistance roll.
          </p>
          <p>
            Overall average resistance including both spell hit roll and resistance score roll: { resistances.overallMitigationIncludingSpellHit }%.
          </p>

          <h4>Spell pen and spell hit values</h4>

          <div className='row'>
            <div className='large-3 medium-4 columns'>
              <label htmlFor='spellBaseDmg'>Spell base damage
                <Field name='spellBaseDmg' component='input' type='number' min='0' />
              </label>
            </div>
            <div className='large-3 medium-4 columns'>
              <label htmlFor='spellPowerCoefficient'>Spell power coefficient
                <Field name='spellPowerCoefficient' component='input' type='number' min='0' max='1' />
              </label>
            </div>
            <div className='large-3 medium-4 columns end'>
              <label htmlFor='spellPower'>Spell power
                <Field name='spellPower' component='input' type='number' min='0' />
              </label>
            </div>
          </div>

          <div className='row'>
            <div className='columns'>
              Stat values (in equivalent Spell Power):
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
  </div>
);

resistancesView.propTypes = {
  resistancesTable: PropTypes.arrayOf(PropTypes.any),
  resistances: PropTypes.any,
};

export default resistancesView;
