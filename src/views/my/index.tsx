import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.module.scss';

@Component
export default class ViewMy extends Vue {
  private get autoColumns() {
    return [
      {
        key: 'type',
        title: '币种',
      },
      {
        key: 'amount',
        title: '金额',
      },
      {
        key: 'createTime',
        title: '定存时间',
      },
      {
        key: 'expireDate',
        title: '到期时间',
      },
      {
        key: 'valid',
        title: '是否有效',
      },
      {
        key: 'opts',
        title: '操作',
        width: 100,
        align: 'center',
      },
    ];
  }

  private get autoData() {
    return [];
  }

  public render(): VNode {
    return (
      <div class={style.view}>
        <a-table
          size="middle"
          columns={this.autoColumns}
          dataSource={this.autoData}>
        </a-table>
      </div>
    );
  }
}
