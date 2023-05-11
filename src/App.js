import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import JsonEditor from "./JsonEditor"
import VoiceoverTemplateForm from "./VoiceoverTemplateForm"
import PageRenderer from "./PageRenderer"

class LambdaDemo extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, msg: null }
  }

  handleClick = api => e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }))
  }

  render() {
    const { loading, msg } = this.state

    return (
      <div>
        <button onClick={this.handleClick("hello")}>{loading ? "Loading..." : "Call Lambda"}</button>
        <button onClick={this.handleClick("async-dadjoke")}>{loading ? "Loading..." : "Call Async Lambda"}</button>
        <br />
        <span>{msg}</span>
        {/* <JsonEditor /> */}
        {/* <VoiceoverTemplateForm /> */}
        <PageRenderer/>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <LambdaDemo />
        </header>
      </div>
    )
  }
}

export default App
