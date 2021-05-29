import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.mod.scss';
import Antd from 'ant-design-vue';

@Component
export default class XAddGroupDialog extends Vue {
  @Prop({ default: false }) private readonly value!: boolean;

  private show: boolean = false;

  @Watch('value', { immediate: true })
  private handleValueChange(nv: boolean) {
    if (nv) {
      this.handleOpen();
    }
    this.show = nv;
  }

  @Emit('input')
  private emitInput(nv: boolean) {
    return nv;
  }

  private handleOpen() {

  }

  private async handleOk() {

  }

  private handleCancel() {
    this.emitInput(false);
  }

  private form: any = {};

  private rules: any = {
    name: [{ required: true, message: '请输入群组名称', trigger: 'blur', }],
  };

  public render(): VNode {
    return (
      <a-modal
        dialogClass={style.com}
        v-model={this.show}
        title="新增群组"
        onOk={this.handleOk}
        onCancel={this.handleCancel}>
        <a-form-model
          ref="form"
          props={{
            model: this.form,
          }}
          rules={this.rules}
          labelAlign="left"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}>
          <a-form-model-item
            label="群组名称"
            prop="name">
            <a-input
              v-model={this.form.name}
              placeholder="请输入群组名称"
            />
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    );
  }
}