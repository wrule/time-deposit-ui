import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.module.scss';
import Antd from 'ant-design-vue';
import Web3 from 'web3';
import DepositJson from '../home/Deposit.json';

interface Form {
  amount: number | null;
  expireDate: number | null;
}

@Component
export default class ViewETH extends Vue {
  private form: Form = {
    amount: null,
    expireDate: null,
  };

  private rules: any = {
    amount: [{ required: true, message: '请输入ETH定存数量', trigger: 'blur', }],
    expireDate: [{ required: true, message: '请输入到期时间', trigger: 'change', }],
  };

  private handleClick() {
    (this.$refs.form as Antd.FormModel).validate((valid) => {
      if (valid) {
        console.log('验证通过');
        this.save(this.form);
      }
    });
  }

  private async save(form: Form) {
    const weiValue = Web3.utils.toWei(form.amount?.toString() || '0');
    const expireDate = Math.floor(Number(form.expireDate) / 1000);
    console.log(weiValue, expireDate);

    const web3 = new Web3('ws://127.0.0.1:7545');
    const depositContract = new web3.eth.Contract(
      DepositJson.abi as any,
      '0x3d1405001628C60807Ec54Fcb8304B0Bb42AD7Dc',
      {
        from: '0x6E9Aeb9f30b3a45cBb426D583c18EcD0F4b1BEd5',
        gas: 1e6,
      },
    );
    const rst = await depositContract.methods.saveETH(expireDate).send({
      value: weiValue,
    });

    this.$message.success('定存成功');
    console.log(rst);
  }

  public render(): VNode {
    return (
      <div class={style.view}>
        <a-form-model
          class={style.form}
          ref="form"
          props={{
            model: this.form,
          }}
          rules={this.rules}
          labelAlign="left">
          <a-form-model-item
            label="ETH定存数量"
            prop="amount">
            <a-input-number
              class={style.item}
              v-model={this.form.amount}
              placeholder="请输入ETH定存数量"
            />
          </a-form-model-item>
          <a-form-model-item
            label="到期日期"
            prop="expireDate">
            <a-date-picker
              class={style.item}
              v-model={this.form.expireDate}
              show-time
              placeholder="请输入到期时间"
            />
          </a-form-model-item>
          <a-form-model-item>
            <div class={[style.item, style.control]}>
              <span></span>
              <a-button onClick={this.handleClick} type="primary">确定</a-button>
            </div>
          </a-form-model-item>
        </a-form-model>
      </div>
    );
  }
}
