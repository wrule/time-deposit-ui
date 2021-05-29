import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.module.scss';
import logo from '@/assets/logo.png';
import XHello from '@/components/hello';
import Web3 from 'web3';
import DepositJson from './Deposit.json';

@Component
export default class ViewHome extends Vue {
  private async handleClick() {
    const web3 = new Web3('ws://127.0.0.1:7545');
    const depositContract = new web3.eth.Contract(
      DepositJson.abi as any,
      '0x3d1405001628C60807Ec54Fcb8304B0Bb42AD7Dc',
      {
        from: '0x6E9Aeb9f30b3a45cBb426D583c18EcD0F4b1BEd5',
        gas: 1e6,
      },
    );
    const rst = await depositContract.methods.saveETH(0).send({
      value: web3.utils.toWei('50'),
    });
    console.log(rst);
    // rst = await web3.eth.getAccounts();
    // rst = web3.eth.defaultAccount;
    // console.log(rst);
  }

  public render(): VNode {
    return (
      <div class={style.view}>
        <a-button onClick={this.handleClick} type="primary">点我定存</a-button>
      </div>
    );
  }
}
