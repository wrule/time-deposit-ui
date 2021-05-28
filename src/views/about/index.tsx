import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.module.scss';

@Component
export default class ViewAbout extends Vue {
  public render(): VNode {
    return (
      <div class={style.view}>
        <span>关于页面</span>
      </div>
    );
  }
}
