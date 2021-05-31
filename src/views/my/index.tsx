import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.module.scss';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import DepositJson from '@/abi/Deposit.json';
import Moment from 'moment';

interface DepositSlip {
  index: number;
  isETH: boolean;
  valid: boolean;
  contractAddr: string;
  amount: string;
  createTime: string;
  expireDate: string;
}

@Component
export default class ViewMy extends Vue {
  private web3: Web3 = null as any;
  private depositContract: Contract = null as any;

  private depositSlips: DepositSlip[] = [];

  private loading = true;

  private async updateTable() {
    this.loading = true;
    try {
      const list: any[] = await this.depositContract.methods.getMyDepositSlips().call();
      this.depositSlips = list.map((item, index) => ({
        index,
        isETH: item.isETH,
        valid: item.valid,
        contractAddr: item.contractAddr,
        amount: item.amount,
        createTime: item.createTime,
        expireDate: item.expireDate,
      }));
    } catch(e) {
      console.error(e);
    }
    this.loading = false;
  }

  private mounted() {
    this.web3 = new Web3('ws://127.0.0.1:7545');
    this.depositContract = new  this.web3.eth.Contract(
      DepositJson.abi as any,
      '0xfB228406B963C602850aFa33cb63B63b01F37E82',
      {
        from: '0x307196e7Becd04E142Ade07d5deea981a072ddf0',
        gas: 1e8,
      },
    );
    this.updateTable();
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
    return (this.depositSlips || []).reverse();
  }

  private handleRedemptionClick(row: DepositSlip) {
    this.redemption(row.index);
  }

  private async redemption(index: number) {
    try {
      const rst: any = await this.depositContract.methods.redemption(index).send({
        gas: 1e6,
      });
      if (rst.status) {
        this.$message.success('定期赎回成功');
        this.updateTable();
      }
      return;
    } catch(e) {
      console.error(e);
    }
    this.$message.error('定期赎回失败');
  }

  private redemptionDisabled(row: DepositSlip) {
    return !row.valid || Number(new Date()) < Number(row.expireDate) * 1000;
  }

  public render(): VNode {
    return (
      <div class={style.view}>
        <a-spin spinning={this.loading}>
          <a-table
            size="middle"
            rowKey="index"
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
                return value ? <a-button size="small">有效</a-button> :
                  <a-button size="small" disabled>无效</a-button>;
              },
              opts: (row: DepositSlip) => {
                return <a-button
                  type="link"
                  size="small"
                  disabled={this.redemptionDisabled(row)}
                  onClick={() => this.handleRedemptionClick(row)}>
                  赎回
                </a-button>;
              },
            }}>
          </a-table>
        </a-spin>
      </div>
    );
  }
}
