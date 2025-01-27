import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'Результат',
      userNumber: '',
      randomNumber: Math.floor((Math.random() *
        this.props.max -
        this.props.min) + this.props.min),
      count: 0,
      isFinished: false,
    };
  }
  handleOneMoreTime = ev => {
    this.setState({
      result: 'Результат',
      isFinished: false,
      count: 0
    });
  };
  handleSubmit = ev => {
    ev.preventDefault();
    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: 'Введите число!'
        };
      }
      if (state.userNumber > state.randomNumber) {
        return {
          count: state.count + 1,
          result: `Число ${state.userNumber} больше загаданного`
        };
      }
      if (state.userNumber < state.randomNumber) {
        return {
          count: state.count + 1,
          result: `Число ${state.userNumber} меньше загаданного`
        };
      }
      return {
        randomNumber: Math.floor((Math.random() *
        this.props.max -
        this.props.min) + this.props.min),
        result: `Вы угадали, загаданное число ${state.userNumber},
          количество попыток ${state.count}`,
        count: 0,
        isFinished: true,
      };
    });
    ev.target.reset();
  };
  handleChange = ev => {
    this.setState({
      userNumber: ev.target.value,
    }
    );
  };
  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>

        <form onSubmit={this.handleSubmit} className={style.form}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>
          <input
            onInput={this.handleChange}
            className={style.input}
            type='number'
            id='user_number'
            disabled={this.state.isFinished}
            // value={this.state.userNumber}
          />
          <button type='submit'
            className={style.btn}
            disabled={this.state.isFinished}
          >Угадать</button>
          <button
            onClick={this.handleOneMoreTime}
            type='button'
            className={`${style.btn}
              ${!this.state.isFinished ? style.btn_disabled : ''}`}>
              Сыграть ещё разок?
          </button>
        </form>

      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number
};
