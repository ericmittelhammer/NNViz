
var NNViz = (function(nnviz) {

    nnviz.geometry = {

        numColumns: function(numLayers) {
            return ((numLayers * 2) - 1);
        },

        colWidth: function(numColumns, canvasWidth) {
            return (canvasWidth / numColumns);
        },

        /** calculates the radius of the nodes within a layer */
        nodeRadius: function(size, columnWidth, columnHeight) {
            if((columnWidth / 2) * size < columnHeight){
              return (columnWidth / 2);
            } else {
              return (columnHeight / size);
            }
        },

        /** 
          * calculates the offeset from the top of the column
          * for each layer
          */
        yOffset: function(size, columnHeight, nodeHeight) {
          //half of the remaining space in the column
          return (columnHeight - (nodeHeight * size)) / 2;
        },

        getX: function(layerIndex, columnWidth){
          return layerIndex * 2 * columnWidth;
        },

        calculateLayer: function(size, columnWidth, columnHeight, index){
          var layer = {};
          layer.numNodes = size;
          layer.columnWidth = columnWidth;
          layer.radius = this.nodeRadius(layer.numNodes, columnWidth, columnHeight);
          layer.yOffset = this.yOffset(layer.numNodes, columnHeight, layer.radius * 2);
          layer.x = this.getX(index, columnWidth);
          return layer;
        },

        getGeometry: function(sizes, canvasWidth, canvasHeight){
          var g = {};
          console.log(this);
          g.numColumns = this.numColumns(sizes.length);
          g.columnWidth = this.colWidth(g.numColumns, canvasHeight);
          g.layers = sizes.map(function(size, index){
            return(this.calculateLayer(size, g.columnWidth, canvasHeight, index));
          }, this);
          return g;

        }

    };

    return nnviz;

}(NNViz || {}));
