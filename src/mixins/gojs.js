import GO from "gojs";
import Vue from "vue";
const go = GO;
const $ = go.GraphObject.make;
const defaultFontStyle = "bold 14px 'fontello', 'Pretendard', 'NanumSquare', sans-serif";

export default Vue.extend({
  data() {
    return {
      // diagram 속성 템플릿
      diagramTemplate: {
        layout: $(go.TreeLayout),
        initialDocumentSpot: go.Spot.Center,
        initialViewportSpot: go.Spot.Center,
        // initialAutoScale: go.Diagram.Uniform,
        contentAlignment: go.Spot.Center,
        // "draggingTool.dragsLink": false,
        // "linkingTool.isUnconnectedLinkValid": false,
        "linkingTool.portGravity": 5,
        "relinkingTool.isUnconnectedLinkValid": false,
        "linkReshapingTool.handleArchetype": $(go.Shape, "Diamond", {
          desiredSize: new go.Size(10, 10),
          fill: "red",
          stroke: "red",
        }),
        "undoManager.isEnabled": false,
        "commandHandler.doKeyDown": () => {
          return;
        },
        maxScale: 1,
        allowCopy: false,
        allowDelete: false,
        allowGroup: false,
        allowUngroup: false,
        allowTextEdit: false,
        allowMove: true,
        allowRotate: false,
        LinkDrawn: (e) => {
          this.onLinkDrawn(e);
          // console.log("%c Hello ", "background: #333399; color: #ededed");
        },
      },
      // element category에 따른 node 템플릿 등
      nodeTemplate: [
        {
          category: "simple",
        },
      ],
      // 연결선 템플릿
      linkTemplate: $(
        go.Link,
        {
          relinkableFrom: false,
          relinkableTo: false,
          // toShortLength: 1,
          reshapable: false,
          // routing: go.Link.AvoidsNodes,
          corner: 0,
          // curve: go.Link.JumpOver,
          selectable: false,
          // fromSpot: go.Spot.Left,
          // toSpot: go.Spot.Right,
        },
        new go.Binding("strokeWidth"),
        $(go.Shape, { stroke: "#999999" }),
        $(go.Shape, { toArrow: "Standard", stroke: null, fill: "#999999" })
      ),
    };
  },
  computed: {
    nodeTemplateMapped() {
      const templmap = new go.Map();
      this.nodeTemplate.forEach((template) => {
        templmap.add(
          template.category,
          $(
            go.Node,
            "Auto",
            {
              fromLinkableDuplicates: false,
              toLinkableDuplicates: false,
              fromLinkableSelfNode: false,
              toLinkableSelfNode: false,
              fromLinkable: true,
              toLinkable: true,
              isLayoutPositioned: false,
              desiredSize: new go.Size(100, 40),
            },
            new go.Binding("location", "position", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Shape, "Rectangle", { fill: "#121212" }),
            $(go.TextBlock, new go.Binding("text"), {
              margin: 12,
              font: defaultFontStyle,
              stroke: "white",
              cursor: "crosshair",
              editable: false,
              textAlign: "center",
              row: 1,
              column: 1,
              width: 64,
              maxSize: new go.Size(80, NaN),
              maxLines: 2,
              overflow: go.TextBlock.OverflowEllipsis,
            }),
            {
              selectionAdornmentTemplate: $(
                go.Adornment,
                $(go.Shape, { isPanelMain: true, stroke: "#00ff62", strokeWidth: 3 }),
                $(go.Shape, { toArrow: "Standard", fill: "#00ff62", stroke: null, scale: 1 })
              ),
            }
          )
        );
      });
      return templmap;
    },
  },
  methods: {
    onLinkDrawn(e) {
      console.log("e:", e);
      const { toNode, fromNode } = e.subject;
      const [toText, fromText] = [toNode.data.text, fromNode.data.text];
      this.$emit("link-drawn", {
        toText,
        fromText,
      });
    },
  },
});
