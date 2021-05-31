import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.module.scss';

interface Form {
  address: string | null;
  amount: number | null;
  expireDate: number | null;
}

@Component
export default class ViewERC20 extends Vue {
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
    console.log(this.form);
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
