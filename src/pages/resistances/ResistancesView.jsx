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
        <div className='medium-8 large-7 columns'>
          <ResponsiveContainer aspect={ 2 } >
            <ComposedChart data={ resistancesTable } margin={ { top: 10, right: 0, left: 0, bottom: 0 } } >
              <Line dataKey='avg mitigation %' stroke='blue' isAnimationActive={ false } dot={ false } />
              <XAxis dataKey='resistance' />
              <YAxis />
              <Legend />
              <Tooltip isAnimationActive={ false } />
              <CartesianGrid strokeDasharray='3 3' />
            </ComposedChart>
          </ResponsiveContainer>
          <ResponsiveContainer aspect={ 2 } >
            <ComposedChart data={ resistancesTable } margin={ { top: 10, right: 0, left: 0, bottom: 0 } } >
              <Line dataKey='effectiveHP' stroke='green' isAnimationActive={ false } dot={ false } />
              <XAxis dataKey='resistance' />
              <YAxis />
              <Legend />
              <Tooltip isAnimationActive={ false } />
              <CartesianGrid strokeDasharray='3 3' />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className='medium-4 large-5 columns'>
          <div className='row'>
            <div className='large-3'>
              <label htmlFor='health'>Health
                <Field name='health' component='input' type='number' min='0' max='25000' />
              </label>
            </div>
          </div>
          <div className='row'>
            <div className='large-3'>
              <label htmlFor='resistance'>Resistance
                <Field name='resistance' component='input' type='number' min='0' max='315' />
              </label>
            </div>
          </div>
          <div className='row'>
            <div className='large-3'>
              <label htmlFor='attackerLevel'>Attacker Level
                <Field name='attackerLevel' component='input' type='number' min='0' max='63' />
              </label>
            </div>
          </div>
          <div className='row'>
            <div className='column large-12'>
              <table>
                <tbody>
                  <tr>
                    <th>Avg Damage Mitigation</th>
                    <td>{resistances.damageReduction}%</td>
                  </tr>
                  <tr>
                    <th>Effective HP</th>
                    <td>{resistances.effectiveHealth}</td>
                  </tr>
                  <tr>
                    <th>Avg Mitigation value per Resistance</th>
                    <td>{resistances.mitValueOfOneResist}%</td>
                  </tr>
                  <tr>
                    <th>EHP value per Resistance</th>
                    <td>{resistances.ehpValueofOneResist}</td>
                  </tr>
                  <tr>
                    <th>EHP value per Stamina</th>
                    <td>{resistances.ehpValueOfTenHealth}</td>
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
