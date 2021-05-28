import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.module.scss';
import logo from '@/assets/logo.png';
import XHello from '@/components/hello';

@Component
export default class ViewHome extends Vue {
  public render(): VNode {
    return (
      <div class={style.view}>
        <img src={logo} />
        <br />
        <span>这是我的主页</span>
        <br />
        <XHello />
      </div>
    );
  }
}
