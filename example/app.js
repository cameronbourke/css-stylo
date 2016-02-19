import React from 'react';
import ReactDOM from 'react-dom';
import stylo from '../src/index';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/mode/css';
import 'brace/theme/github';

class App extends React.Component {
	constructor() {
		super();
		const editorValue = `.example {
	color: #34e233;
	line-height: 1.4;
	padding: 10px 30px 20px 0px;
	border-bottom: 2px solid red;
}`

		this.state = {
			output: stylo(editorValue),
			editorValue,
			validCss: true
		};
	}


	handleOnChange(value) {
		let style;
		let validCss = true;
		try {
			style = stylo(value);
			console.log('style', style);
		} catch(e) {
			validCss = false;
		}

		this.setState({
			output: style || {},
			editorValue: value,
			validCss
		});
	}

	render() {
		return (
			<div>
				<h3 className='title'>stylo</h3>
				<section className='container'>
					<div className='half input'>
						<AceEditor
							mode="css"
							theme="github"
							onChange={this.handleOnChange.bind(this)}
							name="ACE_EDITOR"
							value={this.state.editorValue}
							height='100%'
							width='100%'
							fontSize={15}
						/>
					</div>

					<div className='half output'>
						<pre style={{ color: !this.state.validCss ? 'red' : '#333' }}>
							{JSON.stringify(this.state.output, null, 3)}
						</pre>
					</div>
				</section>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
