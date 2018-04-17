export const  message = {
  "head": {
    "title": "特Iris",
    "list": [
      {
        "txt": "Home",
        "href": "/"
      },
      {
        "txt": "Service",
        "href": "/service"
      },
      {
        "txt": "Accounts",
        "href": "/accounts"
      },
      {
        "txt": "Pending Tx",
        "href": "/"
      }
    ],
    "submit": "SUBMIT",
    "text": "Block / Tx / Accounts",
    "img": {
      "src": "../../static/img/en.png",
      "href": "?lang=EN"
    },
    "modal":[
      "Processing...","Failed !","Done !"
    ]
  },
  "index": [
    {
      "title": "Recent Blocks",
      "list": [
        "Number",
        "Miner",
        "Timestamp",
        "# Tx"
      ],
      "btnRed": "View All"
    },
    {
      "title": "Recent Transactions",
      "list": [
        "Hash",
        "From",
        "To",
        "Amount"
      ],
      "zero": "No transactions during the last 10 blocks",
      "Amount": "| New Contract"
    }
  ],
  "block": [
    {
      "title": "Block",
      "list": [
        "Hash",
        "Parent hash",
        "Miner",
        "Gas Limit",
        "Gas Used",
        "Difficulty",
        "Total Difficulty",
        "Timestamp",
        "Size",
        "Transactions"
      ],

      "btn": [
        "Previous",
        "Next"
      ]
    },
    {
      "title": "Transactions",
      "zero": "Block does not contain any transactions.",
      "list": [
        "Hash",
        "Type",
        "From",
        "To",
        "Amount"
      ],
      "toolTips_txt": "Bad instruction"
    }
  ],
  "tx": [
    {
      "title": "Transaction",
      "list": [
        "Hash",
        "Block hash",
        "Block number",
        "From",
        "To",
        "Amount",
        "Nonce",
        "Gas Limit",
        "Gas Used",
        "Gas Price",
        "Fee",
        "Data"
      ],
      "txt": "New Contract"
    },
    {
      "a": "Raw Trace",
      "title": "Internal Transactions",
      "list": [
        "Type",
        "From",
        "To",
        "Amount"
      ]
    }
  ],
  "service": [
    {
      "title": "Service Definition",
      "list": [
        "Code",
        "Name",
        "Pubilisher",
        "Type",
        "Scope",
        "Create Time",
        "Updated Time"
      ],
      "btnRed": "Create a New Service Definition",
      "create": [
        "Service Code",
        "Service Name",
        "Service Description",
        "Service Type",
        "Private Key",
        "Github",
        "Service Definition",
        "Create or Edit New Service Definition",
        "Cancel",
        "Save"
      ]
    }
  ],
  "service_detail": [
    {
      "title": "Service Definition",
      "detail": [
        "Code",
        "Name",
        "Publisher",
        "Type",
        "Scope",
        "Createtime",
        "Github",
        "Updatetime"
      ],
      "service_binding_List": [
        "Block Type",
        "Bind Address",
        "Action",
        "Fee",
        "Createtime",
        "Updatetime"
      ],
      "service_binding_title": "Service Binding",
      "service_binding_btnRed": "Create New",
      "service_binding_btnBlue": "EDIT",
      "Definition": "Definition",
      "create_list": [
        "Difinition ID",
        "Service Address",
        "Amount",
        "Private Key"
      ],
      "create_title":"Create a New Service Binding",
      "btn": [
        "Save",
        "Cancel"
      ],
      "edit_title":"Edit the New Service Binding",
      "edit_list":[
        "Service Definition ID",
        "Bind / Unbind",
        "Amount",
        "Private Key"
      ]
    }
  ],
  "accounts": {
    "list": [
      "账户",
      "金额"
    ],
    "title": "节点账户",
    "address": "账户",
    "balance": "金额",
    "account": "账户"
  },
}
