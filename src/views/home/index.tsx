import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.module.scss';
import logo from '@/assets/logo.png';
import XHello from '@/components/hello';
import Web3 from 'web3';
import Deposit from './Deposit.json';

@Component
export default class ViewHome extends Vue {

  private mounted() {
    const web3 = new Web3('ws://127.0.0.1:7545');
    const depositContract = new web3.eth.Contract(Deposit as any, "");
    
  }

  public render(): VNode {
    return (
      <div class={style.view}>
        <a-button type="primary">你好，世界</a-button>
        {/* <img src={logo} />
        <br />
        <span>这是我的主页</span>
        <br />
        <XHello /> */}
      </div>
    );
  }
}
