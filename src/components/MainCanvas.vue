<template>
  <div id="canvas-wrapper">
    <div id="canvas-area" @dragover.prevent @dragenter.prevent @drop.prevent="onDrop($event)"></div>
  </div>
</template>

<script>
import GO from "gojs";
import { v4 } from "uuid";
import mixin from "@/mixins/gojs.js";
export default {
  mixins: [mixin],
  data() {
    return {
      diagram: null,
      items: {
        nodes: [],
        links: [],
      },
    };
  },
  methods: {
    init() {
      const go = GO;
      const $ = go.GraphObject.make;
      // diagram 설정
      const diagram = new go.Diagram("canvas-area", {
        ...this.diagramTemplate,
        // "commandHandler.archetypeGroupData": { text: "그룹", isGroup: true },

        // 확대 정도
        // scale: 1,
        // 이벤트 설정
        // 컨텍스트메뉴 설정
        // 선택노드 이동
        // SelectionMoved: this.nodeSelectionMoved,
        // // 클립보드에서 붙여넣기 됨
        // ClipboardPasted: this.clipboardPasted,
        // // Modified: this.updateProcess,

        // // 이름 등의 텍스트 수정 tool
        // // 노드 그룹핑
        // "commandHandler.groupSelection": () => {
        //   this.groupNodes();
        // },
        // // 키 입력
        // "commandHandler.doKeyDown": () => {
        //   const e = diagram.lastInput;
        //   const cmd = diagram.commandHandler;
        //   // 언그룹핑은 키로 사용하지 못하도록 강제해두었음
        //   if (e.control && e.shift && e.key === "G") {
        //     // console.log("%cHello Process.vue line:363 ", "background: green; color: white; display: block;");
        //   }
        //   if (e.key === "Backspace") this.deleteSelection();
        //   else go.CommandHandler.prototype.doKeyDown.call(cmd);
        // },
        // "animationManager.initialAnimationStyle": go.AnimationManager.None,
        // // 링크 관련 이벤트가 생겼을 경우
        // // linkDrawn: (e) => {
        // //   const { model } = this.diagram;
        // // },
        // // node, link, group 설정
        nodeTemplateMap: this.nodeTemplateMapped,
        linkTemplate: this.linkTemplate,
        // groupTemplate: this.groupTemplate,
        // // preview 상태일경우. isReadOnly false면 diagram이 사용불가해짐
        // isReadOnly: this.isPreview,
      });
      this.diagram = diagram;
      // console.log("this.diagram.viewportBounds:", this.diagram.viewportBounds);
    },
    // 기존 모델 적용
    setModel() {
      this.diagram.model = new go.GraphLinksModel(this.items.nodes, this.items.links);
    },
    onDrop(e) {
      // console.log("e:", e);
      const go = GO;
      // 이동 종료
      const { target } = e;
      if (!(target instanceof HTMLCanvasElement)) return; // canvas가 사용 가능한 상황이 아닌 경우 리턴

      // 데이터 불러오기
      const [text] = [e.dataTransfer.getData("text")];
      // 위치 구하기
      const bbox = target.getBoundingClientRect();
      const ratio = this.diagram.computePixelRatio();
      let bbw = bbox.width;
      if (bbw === 0) bbw = 0.001;
      let bbh = bbox.height;
      if (bbh === 0) bbh = 0.001;
      const mx = e.clientX - bbox.left * (target.width / ratio / bbw);
      const my = e.clientY - bbox.top * (target.height / ratio / bbh);
      const point = this.diagram.transformViewToDoc(new go.Point(mx, my));
      const position = new go.Point(point.x, point.y);
      // 키값 설정
      const key = v4();

      // 새 node 설정
      const newNode = {
        position: `${position.x} ${position.y}`,
        text,
        key,
        category: "simple",
      };
      // console.log("position:", position);
      // 새 노드 추가
      this.addNode(newNode);
    },
    // 노드 추가
    addNode(node) {
      const { model } = this.diagram;
      model.addNodeData(node);
    },
  },
  mounted() {
    this.init();
    // setModel();
  },
};
</script>

<style lang="scss" scoped>
#canvas-wrapper {
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  #canvas-area {
    width: 100%;
    height: 100%;
    flex-grow: 1;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
