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
    var cx = this.props.x + this.props.radius;
    var cy = this.props.y + this.props.radius;
    return(
      <circle cx={cx} cy={cy} r={this.props.radius} stroke="black" stroke-width="2" fill="none" />
    );
  }
});

var NetworkLayer = React.createClass({
  render: function() {
    var g = this.props.geometry;
    console.log(g);
    var nodes = [];
    for(var i=0; i<g.numNodes; i++){
      console.log(i);
      nodes.push(<Node x={g.x} y={g.yOffset + (i * g.radius *2)} radius={g.radius} />)
    }
    return(<g>{nodes}</g>);
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
          <NetworkLayer geometry={l} output={this.props.network.outputs[index]}/>
        );
      }, this);

      return (
        <svg width={this.props.width} height={this.props.height}>
          {networkLayers}
        </svg>
      );
    }
});


var NNViz = (function(nnviz, React, brain, doc){
    
    nnviz.init = function(elementId, network) {
      var net = new brain.NeuralNetwork();
      net.fromJSON(network);
      var container = doc.getElementById(elementId);
      console.log(nnviz);
      var geometry = nnviz.geometry.getGeometry(net.sizes, container.clientWidth, container.clientHeight);
      React.renderComponent(<Network network={net} canvasWidth={container.clientWidth} canvasHeight={container.clientHeight} geometry={geometry}/>, container);
    }

    return nnviz;

}(NNViz || {}, React, brain, document));