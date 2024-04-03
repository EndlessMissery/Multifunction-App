import React, { useState } from "react";
import "./Calculator.css"

function Calculator() {
    const [value, setValue] = useState('');

    return (
        <div className="container-calculator">
            <h1 className="calc-h1">Calculator</h1>
            <div className="calculator">
                <form action="">
                    <div className="display-calc">
                        <input 
                            type="text" 
                            value={value} 
                            onChange={e => setValue(e.target.value)} 
                        />
                    </div>
                    <div>
                        <input type="button" value="AC" onClick={() => setValue('')} />
                        <input type="button" value="DE" onClick={() => setValue(value.slice(0, -1))} />
                        <input type="button" value="." onClick={e => setValue(value + e.target.value)} />
                        <input type="button" value="/" onClick={e => setValue(value + e.target.value)} />
                    </div>
                    <div>
                        <input type="button" value="7" onClick={e => setValue(value + e.target.value)} />
                        <input type="button" value="8" onClick={e => setValue(value + e.target.value)} />
                        <input type="button" value="9" onClick={e => setValue(value + e.target.value)} />
                        <input type="button" value="*" onClick={e => setValue(value + e.target.value)} />
                    </div>
                    <div>
                        <input type="button" value="4" onClick={e => setValue(value + e.target.value)} />
                        <input type="button" value="5" onClick={e => setValue(value + e.target.value)} />
                        <input type="button" value="6" onClick={e => setValue(value + e.target.value)} />
                        <input type="button" value="+" onClick={e => setValue(value + e.target.value)} />
                    </div>
                    <div>
                        <input type="button" value="1" onClick={e => setValue(value + e.target.value)} />
                        <input type="button" value="2" onClick={e => setValue(value + e.target.value)} />
                        <input type="button" value="3" onClick={e => setValue(value + e.target.value)} />
                        <input type="button" value="-" onClick={e => setValue(value + e.target.value)} />
                    </div>
                    <div>
                        <input type="button" value="0" onClick={e => setValue(value + e.target.value)} />
                        <input type="button" value="00" onClick={e => setValue(value + e.target.value)} />
                        <input className="equal" type="button" value="=" onClick={e => setValue(eval(value))} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Calculator;
