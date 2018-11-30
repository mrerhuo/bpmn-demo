<template>
  <div class="body-content">
    <div>
      <Button type="primary" @click="save()" @keyup.enter.native="save()">发布工作流</Button>
      <Button type="primary" @click="save1()" @keyup.enter.native="save1()">ccc</Button>
    </div>
    <div id="my-container" class="content" :class="{'with-diagram':isOk,'with-error':!isOk,}">
      <div v-show="!isOk">
        <p>哎呀, 我们无法显示BPMN 2.0图。</p>
        <span>问题的原因:</span>
        <pre>{{errMsg}}</pre>
      </div>
      <div id="my-canvas" class="canvas"></div>
    </div>
  </div>
</template>

<script>
import BpmnModeler from "bpmn-js/lib/Modeler";
import diagramXML from "../assets/newDiagram.bpmn";

export default {
  name: "HelloWorld",
  data() {
    return {
      isOk: false,
      errMsg: "",
      bpmnModeler: null,
      model: {
        bpmnName: "",
        bpmnContent: ""
      }
    };
  },
  mounted() {
    this.initBPMN();
  },
  methods: {
    initBPMN() {
      var container = document.getElementById("my-container");
      this.bpmnModeler = new BpmnModeler({
        container: "#my-canvas"
      });
      var self = this;
      this.bpmnModeler.importXML(diagramXML, function(err) {
        if (err) {
          self.isOk = false;
          self.errMsg = err.message;
          console.error(err);
        } else {
          var logoObj = document.getElementsByClassName("bjs-powered-by");
          logoObj[0].style.display = "none";
          self.isOk = true;
        }
      });
    },
    save() {
      var self = this;
      this.bpmnModeler.saveXML({ format: true }, function(err, xml) {
        console.log(xml);
        self.model.bpmnName = "pro2.bpmn";
        self.model.bpmnContent = encodeURIComponent(xml);
        alert("self.model为bpmn数据");
        // self.axios.post("myresource", self.model).then(function(res) {
        //   console.log(res);
        // });
      });
    },
    save1() {
      this.axios.get("myresource").then(function(res) {
        console.log(res);
      });
    },
    exportBPMN() {
      // this.bpmnModeler.saveSVG(function(err, svg) {
      //   console.log(svg);
      // });
      this.bpmnModeler.saveXML({ format: true }, function(err, xml) {
        console.log(encodeURIComponent(xml));
      });
    }
  },
  //创建Vue页面方法
  created: function() {},
  watch: {
    //需要监听的在此处新增监听对象
  }
};
</script>