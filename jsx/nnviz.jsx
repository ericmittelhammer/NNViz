/** @jsx React.DOM */

function lookupsInOrder(lookup) {
  var arr = [];
  for(var key in lookup) {
    arr[lookup[key]] = key;
  }
  return arr;
}


var Node = React.createClass({

  updated: function() {
    this.props.updateNetwork(this.refs.outputValue.getDOMNode().innerHtml);
  },

  render: function() {
    var fontSizePx = this.props.radius / 2;
    // React doesn't support alignment-baseline, so we have to manually
    // shift the text down 1/2 the hight of a line
    var textVerticalOffset = fontSizePx / 2;
    var neuronStyle={fontFamily:"sans-serif", fontSize: fontSizePx + "px", padding:0}
    var outputString = this.props.output.toString().slice(0,5);
    return(<g>
      <circle className="neuron" cx={this.props.cx} cy={this.props.cy} r={this.props.radius} fill="#3498db" />
      <text
        x={this.props.cx}
        y={this.props.cy + textVerticalOffset}
        textAnchor="middle"
        style={neuronStyle}>{outputString}</text>
      </g>
    );
  }
});

var NetworkLayer = React.createClass({
  render: function() {
    var g = this.props.geometry;
    console.log(this.props.outputs);
    var nodes = g.nodes.map(function(node, index){
      var label = '';
      return(<Node cx={node.cx} cy={node.cy} radius={g.radius} output={this.props.outputs[index] } />)
    }, this);

    return(<g>{nodes}</g>);
  }
});

var Connection = React.createClass({
  render: function(){
    return(<line x1={this.props.start.x}
                 y1={this.props.start.y}
                 x2={this.props.end.x}
                 y2={this.props.end.y}
                 stroke="#34495e"
                 strokeWidth="3"
                 strokeLinecap="square" />);
  }
});

var ConnectionSet = React.createClass({
  render: function() {
    var g = this.props.geometry;
    var connections = _.map(g, function(connection){
      return (<Connection start={connection.start} end={connection.end} />)
    });

    return(<g>{connections}</g>)
  }
});

var Network = React.createClass({

    getInitialState: function() {
      return { network: this.props.initialNetwork }
    },

    updateNetwork: function(index, value) {
      var inputs = this.state.network.outputs[0] //get the values of the first layer of neurons
      inputs[index] = value;
      this.state.network.run({a:0, b:1});
    },

    render: function() {
      //var x = 1000;
      //var y = x * (this.props.height / this.props.width);
      var sizes = this.state.network.sizes;
      var canvasWidth = this.props.canvasWidth;
      var canvasHeight = this.props.canvasHeight;
      var g = this.props.geometry;

      var networkLayers = g.layers.map(function(l, index){
        var labels = [];
        if (index == 0) {
          labels = lookupsInOrder(this.state.network.inputLookup);
        }else if (index == g.layers.length-1) {
          labels = lookupsInOrder(this.state.network.outputLookup);
        }
        return(
          <NetworkLayer
            geometry={l}
            outputs={this.state.network.outputs[index]}
            // if this
            updateNetwork={(index == 0) ? this.updateNetwork : function(a,b){} }/>
        );
      }, this);

      var connections = _.map(g.connections, function(connectionSet){
        console.log(connectionSet);
        return(
          <ConnectionSet geometry={connectionSet} />
        );
      }, this);

      console.log(this);

      return (
        <svg width={this.props.canvasWidth} height={this.props.canvasHeight}>
          {connections}
          {networkLayers}
        </svg>
      );
    }
});


var NNViz = (function(nnviz, React, brain, doc, _){

    nnviz.init = function(elementId, network) {
      var net = new brain.NeuralNetwork();
      net.fromJSON(network);
      net.run({"a": 1, "b":0});
      var container = doc.getElementById(elementId);
      console.log(nnviz);
      var geometry = nnviz.geometry.getGeometry(net.sizes, container.clientWidth, container.clientHeight);
      React.renderComponent(<Network initialNetwork={net} canvasWidth={container.clientWidth} canvasHeight={container.clientHeight} geometry={geometry}/>, container);
    }

    return nnviz;

}(NNViz || {}, React, brain, document, _));
