
var NNViz = (function(nnviz) {

    nnviz.geometry = {

        numColumns: function(numLayers) {
            return ((numLayers * 2) - 1);
        },

        colWidth: function(numColumns, canvasWidth) {
            return (canvasWidth / numColumns);
        },

        nodeRadii: function(sizes, columnWidth, canvasHeight, canvasWidth) {
          console.log(sizes);
          return (sizes.map(function(numNodes){
            if((columnWidth/2) * numNodes < canvasHeight){
              return (columnWidth/2);
            } else {
              return (canvasHeight / numNodes);
            }
          }));
        },

        getGeometry: function(sizes, canvasWidth, canvasHeight){
          var g = {};
          console.log(this);
          g.numColumns = this.numColumns(sizes.length);
          g.columnWidth = this.colWidth(g.numColumns, canvasHeight);
          g.nodeRadii = this.nodeRadii(sizes, g.columnWidth, canvasHeight, canvasWidth);

          return g;

        }

    };

    return nnviz;

}(NNViz || {}));
