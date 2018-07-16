import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { numKeysEvent, operKeysEvent } from './mapKeysEvent'


const styling = {
    numbers: "btn btn-outline-dark",
    operations: "btn btn-outline-info",
    success: "btn btn-outline-success",
    alert: "alert alert-dark"
  }

class Calculator extends Component {
    state = { 
        result: 0,
        operations: '0',
        argum1: '',
        argum2: '',
        oper: '',
    }
    
    componentDidMount() {
        this.equalSign.focus();
    }

    addOperand = (e) => {
        const { operations, argum1, argum2 } = this.state
        console.log(e.target)
        if (
            (e.target.value === '.'
            && argum1.includes('.'))
            || operations.toString().length > 15
        ) {
            return
        }
        if (
            typeof operations !== 'string'
            || (operations === '0' && e.target.value !== '.')
        ) {
            this.setState({
            argum1: e.target.value,
            argum2: '',
            operations: e.target.value
            })
        } else {
            this.setState({
                argum1: argum1 + e.target.value,
                operations: operations + e.target.value
            })
        }
    }

    changeOperation = (e) => {
        const { operations } = this.state
        if ( 
            isNaN(operations)
            && isNaN(operations.slice(-1))
        ) {
          this.setState({
            oper: e.target.value,
            operations: this.state.argum2 + e.target.value
          })
        } else if (this.state.argum2 !== '') {
            this.setState({
                argum1: '',
                argum2: this.getResult(),
                operations: this.getResult() + e.target.value,
                oper: e.target.value
            })
        } else {
            this.setState({
                argum2: this.state.argum1,
                argum1: '',
                operations: operations + e.target.value,
                oper: e.target.value
            })
        }
    }

    getResult = () => {
        const { oper, argum1, argum2 } = this.state
        if (argum1.toString().includes('.') || argum2.toString().includes('.')) {
            let x
        
            argum1.length > argum2.length ? x = argum1 : x = argum2

            let correction = (10**(x.toString().length - x.toString().indexOf('.')))
        
            let second = Number(argum2)*correction
            let first = Number(argum1)*correction
        
            let result = eval(second + oper + first)
        
            if (oper === '+' || oper === '-') {
                result = eval(second + oper + first)/correction
            } else if (oper === '*') {
                result = eval(second + oper + first)/(correction**2)
            } 
        
            this.setState({
                result: result,
                operations: result
            })
            return result

        } else {
            let second = Number(argum2)
            let first = Number(argum1)
            let result = eval(second + oper + first)
            this.setState({
                result: result,
                operations: result
            })
            return result
        }

    }

    reset = () => {
        this.setState({
            result: 0,
            operations: '0',
            argum1: '',
            argum2: ''
        })
    }

    handleKeys = (e) => {
        console.log(e.charCode)
        if (e.charCode === 61) {
            this.getResult()
        } else if (e.charCode === 114 || e.charCode === 1082) {
            this.reset()
        } else if (numKeysEvent[e.charCode]) {
            this.addOperand(numKeysEvent[e.charCode])
        } else if (operKeysEvent[e.charCode]) {
            this.changeOperation(operKeysEvent[e.charCode])
        }  
        return
    }

    render() {
        return (

            <section onKeyPress={this.handleKeys}>
                {/* <p>r: {this.state.result} </p>
                <p>a1: {this.state.argum1} </p>
                <p>a2: {this.state.argum2} </p> */}
                <h1 className={styling.alert}>{this.state.operations}</h1>

                <div >
                    <button className="btn btn-outline-danger xs" onClick={this.reset}> AC </button>
                    <button className={styling.operations} value="*" onClick={this.changeOperation}> * </button>
                    <button className={styling.operations} value="/" onClick={this.changeOperation}> / </button>
                    <button className={styling.numbers} value="7" onClick={this.addOperand}> 7 </button>
                    <button className={styling.numbers} value="8" onClick={this.addOperand}> 8 </button>
                    <button className={styling.numbers} value="9" onClick={this.addOperand}> 9 </button>
                    <button className={styling.operations} value="-" onClick={this.changeOperation}> - </button>
                    <button className={styling.numbers} value="4" onClick={this.addOperand}> 4 </button>
                    <button className={styling.numbers} value="5" onClick={this.addOperand}> 5 </button>
                    <button className={styling.numbers} value="6" onClick={this.addOperand}> 6 </button>
                    <button className={styling.operations} value="+" onClick={this.changeOperation}> + </button>
                    <button className={styling.numbers} value="1" onClick={this.addOperand}> 1 </button>
                    <button className={styling.numbers} value="2" onClick={this.addOperand}> 2 </button>
                    <button className={styling.numbers} value="3" onClick={this.addOperand}> 3 </button>
                    <button className="btn btn-outline-dark xs" value="." onClick={this.addOperand}> . </button>
                    <button className={styling.numbers} value="0" onClick={this.addOperand}> 0 </button>
                    <button ref={node => this.equalSign = node} className={styling.success} onClick={this.getResult}> = </button>
                </div>
            </section>
        );
    }
}

export default Calculator;
