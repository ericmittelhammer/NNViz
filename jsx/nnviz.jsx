/** @jsx React.DOM */

var Network = React.createClass({
    render: function() {
      //var x = 1000;
      //var y = x * (this.props.height / this.props.width);
      var sizes = this.props.network.sizes;
      var g = this.props.geometry;
      
      var nodes = sizes.map(function(numNodes, index){
        var radius = g.nodeRadii[index];
        var yOffset = (this.props.canvasHeight - (radius * 2 * numNodes)) / 2;
        var x = ((index * 2) * g.columnWidth) + (g.columnWidth / 2);
          var nodesInThisLayer = [];
          for(var i=0; i<numNodes; i++){
            var y = yOffset + (i * radius * 2) + (radius );
            console.log(x,y);
            nodesInThisLayer.push(
              <circle cx={x} cy={y} r={radius} stroke="black" stroke-width="2" fill="none" />
              );
          }
          return nodesInThisLayer;
      }, this);

      return (
        <svg width={this.props.width} height={this.props.height}>
          {nodes}
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