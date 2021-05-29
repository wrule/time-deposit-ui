import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.module.scss';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import DepositJson from '@/views/home/Deposit.json';
import Moment from 'moment';

@Component
export default class ViewMy extends Vue {
  private web3: Web3 = null as any;
  private depositContract: Contract = null as any;

  private list: any[] = [];

  private async updateTable(index: number) {
    console.log(this.depositContract);
    const rst = await this.depositContract.methods.depositSlips(
      '0x6E9Aeb9f30b3a45cBb426D583c18EcD0F4b1BEd5',
      index,
    ).call();
    this.list = this.list.concat([rst]);
    console.log(this.list);
  }

  private mounted() {
    this.web3 = new Web3('ws://127.0.0.1:7545');
    this.depositContract = new  this.web3.eth.Contract(
      DepositJson.abi as any,
      '0x3d1405001628C60807Ec54Fcb8304B0Bb42AD7Dc',
      {
        from: '0x6E9Aeb9f30b3a45cBb426D583c18EcD0F4b1BEd5',
        gas: 1e8,
      },
    );
    this.updateTable(0);
  }

  private get autoColumns() {
    return [
      {
        key: 'isETH',
        dataIndex: 'isETH',
        title: '币种',
        scopedSlots: { customRender: 'isETH' },
      },
      {
        key: 'amount',
        dataIndex: 'amount',
        title: '金额',
      },
      {
        key: 'createTime',
        dataIndex: 'createTime',
        title: '定存时间',
        scopedSlots: { customRender: 'createTime' },
      },
      {
        key: 'expireDate',
        dataIndex: 'expireDate',
        title: '到期时间',
        scopedSlots: { customRender: 'expireDate' },
      },
      {
        key: 'valid',
        dataIndex: 'valid',
        title: '是否有效',
        scopedSlots: { customRender: 'valid' },
      },
      {
        key: 'opts',
        title: '操作',
        width: 100,
        align: 'center',
        scopedSlots: { customRender: 'opts' },
      },
    ];
  }

  private get autoData() {
    return this.list;
  }

  private index = 0;

  private handleClick() {
    this.updateTable(this.index);
  }

  public render(): VNode {
    return (
      <div class={style.view}>
        <a-input-number v-model={this.index} />
        <a-button type="primary" onClick={this.handleClick}>确定</a-button>
        <a-table
          size="middle"
          columns={this.autoColumns}
          dataSource={this.autoData}
          scopedSlots={{
            isETH: (value: any) => {
              return <span>{value ? 'ETH' : 'ERC20代币'}</span>;
            },
            createTime: (value: number) => {
              return <span>{Moment(Number(value) * 1000).format('YYYY-MM-DD HH:mm:ss')}</span>;
            },
            expireDate: (value: number) => {
              return <span>{Moment(Number(value) * 1000).format('YYYY-MM-DD HH:mm:ss')}</span>;
            },
            valid: (value: any) => {
              return <span>{value ? '有效' : '无效'}</span>;
            },
            opts: (value: any) => {
              return <span>
                <a href="javascript:;">赎回</a>
                {/* <a-button type="primary" size="small">赎回</a-button> */}
              </span>;
            },
          }}>
        </a-table>
      </div>
    );
  }
}
