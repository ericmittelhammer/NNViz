/** @jsx React.DOM */

function lookupsInOrder(lookup) {
  var arr = [];
  for(var key in lookup) {
    arr[lookup[key]] = key;
  }
  return arr;
}


var Node = React.createClass({
  render: function() {
    return(<g>
      <circle cx={this.props.cx} cy={this.props.cy} r={this.props.radius} fill="#3498db" />
      <text x={this.props.cx} y={this.props.cy}>{this.props.label}</text>
      </g>
    );
  }
});

var NetworkLayer = React.createClass({
  render: function() {
    var g = this.props.geometry;
    console.log(g);
    var nodes = g.nodes.map(function(node, index){
      var label = '';
      if 
      return(<Node cx={node.cx} cy={node.cy} radius={g.radius} label={this.props.values[index]}/>)
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
    render: function() {
      //var x = 1000;
      //var y = x * (this.props.height / this.props.width);
      var sizes = this.props.network.sizes;
      var canvasWidth = this.props.canvasWidth;
      var canvasHeight = this.props.canvasHeight;
      var g = this.props.geometry;

      var networkLayers = g.layers.map(function(l, index){
        return(
          <NetworkLayer geometry={l} values={this.props.network.layers[index]}/>
        );
      }, this);

      var connections = _.map(g.connections, function(connectionSet){
        console.log(connectionSet);
        return(
          <ConnectionSet geometry={connectionSet} />
        );
      }, this);

      return (
        <svg width={this.props.width} height={this.props.height}>
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
      var container = doc.getElementById(elementId);
      console.log(nnviz);
      var geometry = nnviz.geometry.getGeometry(net.sizes, container.clientWidth, container.clientHeight);
      React.renderComponent(<Network network={net} canvasWidth={container.clientWidth} canvasHeight={container.clientHeight} geometry={geometry}/>, container);
    }

    return nnviz;

}(NNViz || {}, React, brain, document, _));