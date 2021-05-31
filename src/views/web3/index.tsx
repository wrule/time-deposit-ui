import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.module.scss';
import Web3 from 'web3';

@Component
export default class ViewWeb3 extends Vue {
  private handleClick() {
    console.log(1234);
    console.log((window as any).ethereum);
    console.log(Web3.givenProvider);
  }

  public render(): VNode {
    return (
      <div class={style.view}>
        <span>Web3测试页面</span>
        <br />
        <a-button type="primary" onClick={this.handleClick}>点我</a-button>
      </div>
    );
  }
}
