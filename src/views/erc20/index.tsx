import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.module.scss';
import TestCoin from '@/abi/TestCoin.json';
import Deposit from '@/abi/Deposit.json';
import Antd from 'ant-design-vue';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

interface Form {
  address: string | null;
  amount: number | null;
  expireDate: number | null;
}

@Component
export default class ViewERC20 extends Vue {
  private web3: Web3 = null as any;
  private testCoinContract: Contract = null as any;
  private depositContract: Contract = null as any;

  private form: Form = {
    address: null,
    amount: null,
    expireDate: null,
  };

  private rules: any = {
    address: [{ required: true, message: '请输入ERC20代币合约地址', trigger: 'blur', }],
    amount: [{ required: true, message: '请输入ERC20代币定存数量', trigger: 'blur', }],
    expireDate: [{ required: true, message: '请输入到期时间', trigger: 'blur', }],
  };

  private handleClick() {
    (this.$refs.form as Antd.FormModel).validate((valid) => {
      if (valid) {
        console.log('验证通过', this.form);
        this.save(this.form);
      }
    });
  }

  private async save(form: Form) {
    const erc20Value = form.amount as number;
    const expireDate = Math.floor(Number(form.expireDate) / 1000);
    console.log(this.testCoinContract);
    const rst = await this.testCoinContract.methods.approve(
      '0xfB228406B963C602850aFa33cb63B63b01F37E82',
      erc20Value,
    ).send({
      gas: 1e6,
    });
    if (rst.status) {
      this.$message.success('代币额度批准成功');
      const rst = await this.depositContract.methods.saveERC20(
        erc20Value,
        expireDate,
        this.form.address,
      ).send({
        gas: 1e6,
      });
      if (rst.status) {
        this.$message.success('代币定存成功');
      }
    }
  }

  private mounted() {
    this.web3 = new Web3('ws://127.0.0.1:7545');
    this.testCoinContract = new this.web3.eth.Contract(
      TestCoin.abi as any,
      '0x0ad5BC7e88e035793a83751c4A5b18C1efBECc75',
      {
        from: '0x307196e7Becd04E142Ade07d5deea981a072ddf0',
        gas: 1e8,
      },
    );
    this.depositContract = new this.web3.eth.Contract(
      Deposit.abi as any,
      '0xfB228406B963C602850aFa33cb63B63b01F37E82',
      {
        from: '0x307196e7Becd04E142Ade07d5deea981a072ddf0',
        gas: 1e8,
      },
    );
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
            label="ERC20代币合约地址"
            prop="address">
            <a-input
              class={style.item}
              v-model={this.form.address}
              placeholder="请输入ERC20代币合约地址"
            />
          </a-form-model-item>
          <a-form-model-item
            label="ERC20代币定存数量"
            prop="amount">
            <a-input-number
              class={style.item}
              v-model={this.form.amount}
              placeholder="请输入ERC20代币定存数量"
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
