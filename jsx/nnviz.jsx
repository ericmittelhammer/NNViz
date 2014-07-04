/** @jsx React.DOM */

var Network = React.createClass({
    render: function() {
        return <div>Network</div>
    }
});


var NNViz = (function(nnviz, React){
    
    nnviz.init = function(elementId, network) {
      var container = document.getElementById(elementId);
      React.renderComponent(<Network />, container);
    }

    return nnviz;

}(NNViz || {}, React));