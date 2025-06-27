
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/home"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/verify-otp"
  },
  {
    "renderMode": 2,
    "route": "/network-error"
  },
  {
    "renderMode": 2,
    "route": "/changepassword"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2IQBELJQ.js"
    ],
    "route": "/admindashboard"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2IQBELJQ.js",
      "chunk-5LQB6H5R.js",
      "chunk-WD357SK2.js",
      "chunk-22XLZZUC.js",
      "chunk-7RAIQIRP.js",
      "chunk-C762CE46.js"
    ],
    "route": "/admindashboard/user-management"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2IQBELJQ.js",
      "chunk-WNL6AGL5.js",
      "chunk-7RAIQIRP.js"
    ],
    "route": "/admindashboard/role-management"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-42ZAAHKC.js",
      "chunk-XIUMAWMY.js",
      "chunk-VN3CQEPZ.js",
      "chunk-WD357SK2.js",
      "chunk-BVL7HW6S.js",
      "chunk-5OGTSBLF.js",
      "chunk-22XLZZUC.js",
      "chunk-FZWSZKQV.js",
      "chunk-D65YN2DH.js",
      "chunk-C762CE46.js"
    ],
    "route": "/panel-coordinator"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-42ZAAHKC.js",
      "chunk-XIUMAWMY.js",
      "chunk-VN3CQEPZ.js",
      "chunk-WD357SK2.js",
      "chunk-BVL7HW6S.js",
      "chunk-5OGTSBLF.js",
      "chunk-22XLZZUC.js",
      "chunk-FZWSZKQV.js",
      "chunk-D65YN2DH.js",
      "chunk-C762CE46.js"
    ],
    "route": "/panel-coordinator/dashboard"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-42ZAAHKC.js",
      "chunk-XIUMAWMY.js",
      "chunk-VN3CQEPZ.js",
      "chunk-WD357SK2.js",
      "chunk-BVL7HW6S.js",
      "chunk-5OGTSBLF.js",
      "chunk-22XLZZUC.js",
      "chunk-FZWSZKQV.js",
      "chunk-D65YN2DH.js",
      "chunk-C762CE46.js"
    ],
    "route": "/panel-coordinator/all-panelMembers"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-42ZAAHKC.js",
      "chunk-XIUMAWMY.js",
      "chunk-VN3CQEPZ.js",
      "chunk-WD357SK2.js",
      "chunk-BVL7HW6S.js",
      "chunk-5OGTSBLF.js",
      "chunk-22XLZZUC.js",
      "chunk-FZWSZKQV.js",
      "chunk-D65YN2DH.js",
      "chunk-C762CE46.js"
    ],
    "route": "/panel-coordinator/map-panel-member"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-42ZAAHKC.js",
      "chunk-XIUMAWMY.js",
      "chunk-VN3CQEPZ.js",
      "chunk-WD357SK2.js",
      "chunk-BVL7HW6S.js",
      "chunk-5OGTSBLF.js",
      "chunk-22XLZZUC.js",
      "chunk-FZWSZKQV.js",
      "chunk-D65YN2DH.js",
      "chunk-C762CE46.js"
    ],
    "route": "/panel-coordinator/mapped-panel-member"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-42ZAAHKC.js",
      "chunk-XIUMAWMY.js",
      "chunk-VN3CQEPZ.js",
      "chunk-WD357SK2.js",
      "chunk-BVL7HW6S.js",
      "chunk-5OGTSBLF.js",
      "chunk-22XLZZUC.js",
      "chunk-FZWSZKQV.js",
      "chunk-D65YN2DH.js",
      "chunk-C762CE46.js"
    ],
    "route": "/panel-coordinator/allocate-panel-window"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-42ZAAHKC.js",
      "chunk-XIUMAWMY.js",
      "chunk-VN3CQEPZ.js",
      "chunk-WD357SK2.js",
      "chunk-BVL7HW6S.js",
      "chunk-5OGTSBLF.js",
      "chunk-22XLZZUC.js",
      "chunk-FZWSZKQV.js",
      "chunk-D65YN2DH.js",
      "chunk-C762CE46.js"
    ],
    "route": "/panel-coordinator/panel-windows"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-42ZAAHKC.js",
      "chunk-XIUMAWMY.js",
      "chunk-VN3CQEPZ.js",
      "chunk-WD357SK2.js",
      "chunk-BVL7HW6S.js",
      "chunk-5OGTSBLF.js",
      "chunk-22XLZZUC.js",
      "chunk-FZWSZKQV.js",
      "chunk-D65YN2DH.js",
      "chunk-C762CE46.js"
    ],
    "route": "/panel-coordinator/panel-calendar"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2MB3F3DZ.js",
      "chunk-XIUMAWMY.js",
      "chunk-VN3CQEPZ.js",
      "chunk-WD357SK2.js",
      "chunk-F5X5MWHG.js",
      "chunk-BVL7HW6S.js",
      "chunk-5OGTSBLF.js",
      "chunk-22XLZZUC.js",
      "chunk-JRQ3EUPC.js",
      "chunk-IDUWUNZ3.js"
    ],
    "route": "/panel-member"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2MB3F3DZ.js",
      "chunk-XIUMAWMY.js",
      "chunk-VN3CQEPZ.js",
      "chunk-WD357SK2.js",
      "chunk-F5X5MWHG.js",
      "chunk-BVL7HW6S.js",
      "chunk-5OGTSBLF.js",
      "chunk-22XLZZUC.js",
      "chunk-JRQ3EUPC.js",
      "chunk-IDUWUNZ3.js"
    ],
    "route": "/panel-member/dashboard"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2MB3F3DZ.js",
      "chunk-XIUMAWMY.js",
      "chunk-VN3CQEPZ.js",
      "chunk-WD357SK2.js",
      "chunk-F5X5MWHG.js",
      "chunk-BVL7HW6S.js",
      "chunk-5OGTSBLF.js",
      "chunk-22XLZZUC.js",
      "chunk-JRQ3EUPC.js",
      "chunk-IDUWUNZ3.js"
    ],
    "route": "/panel-member/get-slots"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2MB3F3DZ.js",
      "chunk-XIUMAWMY.js",
      "chunk-VN3CQEPZ.js",
      "chunk-WD357SK2.js",
      "chunk-F5X5MWHG.js",
      "chunk-BVL7HW6S.js",
      "chunk-5OGTSBLF.js",
      "chunk-22XLZZUC.js",
      "chunk-JRQ3EUPC.js",
      "chunk-IDUWUNZ3.js"
    ],
    "route": "/panel-member/panel-member-calendar"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2MB3F3DZ.js",
      "chunk-XIUMAWMY.js",
      "chunk-VN3CQEPZ.js",
      "chunk-WD357SK2.js",
      "chunk-F5X5MWHG.js",
      "chunk-BVL7HW6S.js",
      "chunk-5OGTSBLF.js",
      "chunk-22XLZZUC.js",
      "chunk-JRQ3EUPC.js",
      "chunk-IDUWUNZ3.js"
    ],
    "route": "/panel-member/panel-member-window"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2MB3F3DZ.js",
      "chunk-XIUMAWMY.js",
      "chunk-VN3CQEPZ.js",
      "chunk-WD357SK2.js",
      "chunk-F5X5MWHG.js",
      "chunk-BVL7HW6S.js",
      "chunk-5OGTSBLF.js",
      "chunk-22XLZZUC.js",
      "chunk-JRQ3EUPC.js",
      "chunk-IDUWUNZ3.js"
    ],
    "route": "/panel-member/slot-form"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2K3HQ4IL.js",
      "chunk-F5X5MWHG.js",
      "chunk-BVL7HW6S.js",
      "chunk-5OGTSBLF.js",
      "chunk-22XLZZUC.js",
      "chunk-WG3S2NED.js",
      "chunk-IDUWUNZ3.js",
      "chunk-D65YN2DH.js",
      "chunk-C762CE46.js"
    ],
    "route": "/tadmin"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2K3HQ4IL.js",
      "chunk-F5X5MWHG.js",
      "chunk-BVL7HW6S.js",
      "chunk-5OGTSBLF.js",
      "chunk-22XLZZUC.js",
      "chunk-WG3S2NED.js",
      "chunk-IDUWUNZ3.js",
      "chunk-D65YN2DH.js",
      "chunk-C762CE46.js"
    ],
    "route": "/tadmin/dashboard"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2K3HQ4IL.js",
      "chunk-F5X5MWHG.js",
      "chunk-BVL7HW6S.js",
      "chunk-5OGTSBLF.js",
      "chunk-22XLZZUC.js",
      "chunk-WG3S2NED.js",
      "chunk-IDUWUNZ3.js",
      "chunk-D65YN2DH.js",
      "chunk-C762CE46.js"
    ],
    "route": "/tadmin/interview-list"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2K3HQ4IL.js",
      "chunk-F5X5MWHG.js",
      "chunk-BVL7HW6S.js",
      "chunk-5OGTSBLF.js",
      "chunk-22XLZZUC.js",
      "chunk-WG3S2NED.js",
      "chunk-IDUWUNZ3.js",
      "chunk-D65YN2DH.js",
      "chunk-C762CE46.js"
    ],
    "route": "/tadmin/calendar"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-TFZCIM2X.js",
      "chunk-7RAIQIRP.js",
      "chunk-FZWSZKQV.js",
      "chunk-JRQ3EUPC.js",
      "chunk-WG3S2NED.js",
      "chunk-IDUWUNZ3.js",
      "chunk-D65YN2DH.js",
      "chunk-C762CE46.js"
    ],
    "route": "/ta-recruiter"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-TFZCIM2X.js",
      "chunk-7RAIQIRP.js",
      "chunk-FZWSZKQV.js",
      "chunk-JRQ3EUPC.js",
      "chunk-WG3S2NED.js",
      "chunk-IDUWUNZ3.js",
      "chunk-D65YN2DH.js",
      "chunk-C762CE46.js"
    ],
    "route": "/ta-recruiter/tadashboard"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-TFZCIM2X.js",
      "chunk-7RAIQIRP.js",
      "chunk-FZWSZKQV.js",
      "chunk-JRQ3EUPC.js",
      "chunk-WG3S2NED.js",
      "chunk-IDUWUNZ3.js",
      "chunk-D65YN2DH.js",
      "chunk-C762CE46.js"
    ],
    "route": "/ta-recruiter/slot-list"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-TFZCIM2X.js",
      "chunk-7RAIQIRP.js",
      "chunk-FZWSZKQV.js",
      "chunk-JRQ3EUPC.js",
      "chunk-WG3S2NED.js",
      "chunk-IDUWUNZ3.js",
      "chunk-D65YN2DH.js",
      "chunk-C762CE46.js"
    ],
    "route": "/ta-recruiter/schedule-calendar"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-TFZCIM2X.js",
      "chunk-7RAIQIRP.js",
      "chunk-FZWSZKQV.js",
      "chunk-JRQ3EUPC.js",
      "chunk-WG3S2NED.js",
      "chunk-IDUWUNZ3.js",
      "chunk-D65YN2DH.js",
      "chunk-C762CE46.js"
    ],
    "route": "/ta-recruiter/scheduled-interviews"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-MVHUZHTV.js",
      "chunk-VN3CQEPZ.js",
      "chunk-WD357SK2.js",
      "chunk-F5X5MWHG.js",
      "chunk-5OGTSBLF.js",
      "chunk-22XLZZUC.js",
      "chunk-D65YN2DH.js",
      "chunk-C762CE46.js"
    ],
    "route": "/reporting-manager"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-MVHUZHTV.js",
      "chunk-VN3CQEPZ.js",
      "chunk-WD357SK2.js",
      "chunk-F5X5MWHG.js",
      "chunk-5OGTSBLF.js",
      "chunk-22XLZZUC.js",
      "chunk-D65YN2DH.js",
      "chunk-C762CE46.js"
    ],
    "route": "/reporting-manager/dashboard"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-MVHUZHTV.js",
      "chunk-VN3CQEPZ.js",
      "chunk-WD357SK2.js",
      "chunk-F5X5MWHG.js",
      "chunk-5OGTSBLF.js",
      "chunk-22XLZZUC.js",
      "chunk-D65YN2DH.js",
      "chunk-C762CE46.js"
    ],
    "route": "/reporting-manager/team-members"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-MVHUZHTV.js",
      "chunk-VN3CQEPZ.js",
      "chunk-WD357SK2.js",
      "chunk-F5X5MWHG.js",
      "chunk-5OGTSBLF.js",
      "chunk-22XLZZUC.js",
      "chunk-D65YN2DH.js",
      "chunk-C762CE46.js"
    ],
    "route": "/reporting-manager/reporting-manager-calendar"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-IPECC6QC.js",
      "chunk-WG3S2NED.js"
    ],
    "route": "/candidate"
  },
  {
    "renderMode": 2,
    "route": "/unauthorized"
  },
  {
    "renderMode": 2,
    "redirectTo": "/login",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 31090, hash: 'fb017ee39765f6e1601f0f6c8e59151364afa0f659942438a02feedd7792c65e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17480, hash: '3a4f113126165c30f0330ce9b50d2f79cfc377151a615938936592b54a73b617', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 36315, hash: '732f292fef3f25a2226f348a8e24724c8c09e82413066ddce0c62c575ca3b7b7', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'network-error/index.html': {size: 38475, hash: '9036a0dce5ad460e75cbe1af0e97ebf61f81fd78bf7c54780046608953f45fa0', text: () => import('./assets-chunks/network-error_index_html.mjs').then(m => m.default)},
    'changepassword/index.html': {size: 36315, hash: '732f292fef3f25a2226f348a8e24724c8c09e82413066ddce0c62c575ca3b7b7', text: () => import('./assets-chunks/changepassword_index_html.mjs').then(m => m.default)},
    'admindashboard/index.html': {size: 36368, hash: '32fa968b4882392b41e520210048d6626c5517147f60abefaa542b81a114807c', text: () => import('./assets-chunks/admindashboard_index_html.mjs').then(m => m.default)},
    'admindashboard/user-management/index.html': {size: 36628, hash: 'c550533b04bdae736d4a2882e873cab45e55e18464a74350db83b82b17d76711', text: () => import('./assets-chunks/admindashboard_user-management_index_html.mjs').then(m => m.default)},
    'admindashboard/role-management/index.html': {size: 36472, hash: '041c9354280e2142b4cd48a48e018b4f437be690f7d57765417036f205493617', text: () => import('./assets-chunks/admindashboard_role-management_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 37215, hash: 'a9df69a31bf5087541b49f8a34359cea66405a3479778735d99e3731fe776600', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'verify-otp/index.html': {size: 36315, hash: '732f292fef3f25a2226f348a8e24724c8c09e82413066ddce0c62c575ca3b7b7', text: () => import('./assets-chunks/verify-otp_index_html.mjs').then(m => m.default)},
    'panel-coordinator/index.html': {size: 36836, hash: 'c28da0797dde7ef538159da1aab8054c05bfb4d1db7afeac6662550aaa25bb99', text: () => import('./assets-chunks/panel-coordinator_index_html.mjs').then(m => m.default)},
    'panel-coordinator/map-panel-member/index.html': {size: 36836, hash: 'c28da0797dde7ef538159da1aab8054c05bfb4d1db7afeac6662550aaa25bb99', text: () => import('./assets-chunks/panel-coordinator_map-panel-member_index_html.mjs').then(m => m.default)},
    'panel-coordinator/mapped-panel-member/index.html': {size: 36836, hash: 'c28da0797dde7ef538159da1aab8054c05bfb4d1db7afeac6662550aaa25bb99', text: () => import('./assets-chunks/panel-coordinator_mapped-panel-member_index_html.mjs').then(m => m.default)},
    'panel-coordinator/dashboard/index.html': {size: 36836, hash: 'c28da0797dde7ef538159da1aab8054c05bfb4d1db7afeac6662550aaa25bb99', text: () => import('./assets-chunks/panel-coordinator_dashboard_index_html.mjs').then(m => m.default)},
    'panel-coordinator/all-panelMembers/index.html': {size: 36836, hash: 'c28da0797dde7ef538159da1aab8054c05bfb4d1db7afeac6662550aaa25bb99', text: () => import('./assets-chunks/panel-coordinator_all-panelMembers_index_html.mjs').then(m => m.default)},
    'panel-coordinator/allocate-panel-window/index.html': {size: 36836, hash: 'c28da0797dde7ef538159da1aab8054c05bfb4d1db7afeac6662550aaa25bb99', text: () => import('./assets-chunks/panel-coordinator_allocate-panel-window_index_html.mjs').then(m => m.default)},
    'panel-coordinator/panel-calendar/index.html': {size: 36836, hash: 'c28da0797dde7ef538159da1aab8054c05bfb4d1db7afeac6662550aaa25bb99', text: () => import('./assets-chunks/panel-coordinator_panel-calendar_index_html.mjs').then(m => m.default)},
    'panel-coordinator/panel-windows/index.html': {size: 36836, hash: 'c28da0797dde7ef538159da1aab8054c05bfb4d1db7afeac6662550aaa25bb99', text: () => import('./assets-chunks/panel-coordinator_panel-windows_index_html.mjs').then(m => m.default)},
    'panel-member/dashboard/index.html': {size: 36836, hash: '83c2c52656ac2305b6e59cc0345fd116a9bb49bf63eb5302485bea694c3e83b8', text: () => import('./assets-chunks/panel-member_dashboard_index_html.mjs').then(m => m.default)},
    'panel-member/index.html': {size: 36836, hash: '83c2c52656ac2305b6e59cc0345fd116a9bb49bf63eb5302485bea694c3e83b8', text: () => import('./assets-chunks/panel-member_index_html.mjs').then(m => m.default)},
    'panel-member/get-slots/index.html': {size: 36836, hash: '83c2c52656ac2305b6e59cc0345fd116a9bb49bf63eb5302485bea694c3e83b8', text: () => import('./assets-chunks/panel-member_get-slots_index_html.mjs').then(m => m.default)},
    'panel-member/panel-member-window/index.html': {size: 36836, hash: '83c2c52656ac2305b6e59cc0345fd116a9bb49bf63eb5302485bea694c3e83b8', text: () => import('./assets-chunks/panel-member_panel-member-window_index_html.mjs').then(m => m.default)},
    'panel-member/slot-form/index.html': {size: 36836, hash: '83c2c52656ac2305b6e59cc0345fd116a9bb49bf63eb5302485bea694c3e83b8', text: () => import('./assets-chunks/panel-member_slot-form_index_html.mjs').then(m => m.default)},
    'panel-member/panel-member-calendar/index.html': {size: 36836, hash: '83c2c52656ac2305b6e59cc0345fd116a9bb49bf63eb5302485bea694c3e83b8', text: () => import('./assets-chunks/panel-member_panel-member-calendar_index_html.mjs').then(m => m.default)},
    'tadmin/dashboard/index.html': {size: 36784, hash: 'f47aae857022a6cb51014cd793d3c221f894b4359ea293437858fdb8a99f1b89', text: () => import('./assets-chunks/tadmin_dashboard_index_html.mjs').then(m => m.default)},
    'tadmin/index.html': {size: 36784, hash: 'f47aae857022a6cb51014cd793d3c221f894b4359ea293437858fdb8a99f1b89', text: () => import('./assets-chunks/tadmin_index_html.mjs').then(m => m.default)},
    'tadmin/calendar/index.html': {size: 36784, hash: 'f47aae857022a6cb51014cd793d3c221f894b4359ea293437858fdb8a99f1b89', text: () => import('./assets-chunks/tadmin_calendar_index_html.mjs').then(m => m.default)},
    'tadmin/interview-list/index.html': {size: 36784, hash: 'f47aae857022a6cb51014cd793d3c221f894b4359ea293437858fdb8a99f1b89', text: () => import('./assets-chunks/tadmin_interview-list_index_html.mjs').then(m => m.default)},
    'ta-recruiter/slot-list/index.html': {size: 36732, hash: 'dd39cd098365aefde9ef4d3f5c44d0a934b0f7409e1c859c6dfd217bab4edceb', text: () => import('./assets-chunks/ta-recruiter_slot-list_index_html.mjs').then(m => m.default)},
    'ta-recruiter/index.html': {size: 36732, hash: 'dd39cd098365aefde9ef4d3f5c44d0a934b0f7409e1c859c6dfd217bab4edceb', text: () => import('./assets-chunks/ta-recruiter_index_html.mjs').then(m => m.default)},
    'ta-recruiter/tadashboard/index.html': {size: 36732, hash: 'dd39cd098365aefde9ef4d3f5c44d0a934b0f7409e1c859c6dfd217bab4edceb', text: () => import('./assets-chunks/ta-recruiter_tadashboard_index_html.mjs').then(m => m.default)},
    'ta-recruiter/schedule-calendar/index.html': {size: 36732, hash: 'dd39cd098365aefde9ef4d3f5c44d0a934b0f7409e1c859c6dfd217bab4edceb', text: () => import('./assets-chunks/ta-recruiter_schedule-calendar_index_html.mjs').then(m => m.default)},
    'ta-recruiter/scheduled-interviews/index.html': {size: 36732, hash: 'dd39cd098365aefde9ef4d3f5c44d0a934b0f7409e1c859c6dfd217bab4edceb', text: () => import('./assets-chunks/ta-recruiter_scheduled-interviews_index_html.mjs').then(m => m.default)},
    'reporting-manager/index.html': {size: 36732, hash: '6ce8d7c032503ea825a59c1979bbb4d5c341ebfbd74869460dccef009d5c1ce8', text: () => import('./assets-chunks/reporting-manager_index_html.mjs').then(m => m.default)},
    'reporting-manager/team-members/index.html': {size: 36732, hash: '6ce8d7c032503ea825a59c1979bbb4d5c341ebfbd74869460dccef009d5c1ce8', text: () => import('./assets-chunks/reporting-manager_team-members_index_html.mjs').then(m => m.default)},
    'reporting-manager/dashboard/index.html': {size: 36732, hash: '6ce8d7c032503ea825a59c1979bbb4d5c341ebfbd74869460dccef009d5c1ce8', text: () => import('./assets-chunks/reporting-manager_dashboard_index_html.mjs').then(m => m.default)},
    'candidate/index.html': {size: 36420, hash: '281b1a0c7c4006cec1003ebb6507352424ee01311f34c00452eb41bf671227be', text: () => import('./assets-chunks/candidate_index_html.mjs').then(m => m.default)},
    'reporting-manager/reporting-manager-calendar/index.html': {size: 36732, hash: '6ce8d7c032503ea825a59c1979bbb4d5c341ebfbd74869460dccef009d5c1ce8', text: () => import('./assets-chunks/reporting-manager_reporting-manager-calendar_index_html.mjs').then(m => m.default)},
    'unauthorized/index.html': {size: 37018, hash: 'cd2b2d1a49cecaac5804ab8dc598dc4801ed99c9cb6ff8fb0243ee9bc8bea2e3', text: () => import('./assets-chunks/unauthorized_index_html.mjs').then(m => m.default)},
    'styles-IDY6Z7HY.css': {size: 42144, hash: 'hj+Ds5H6n2o', text: () => import('./assets-chunks/styles-IDY6Z7HY_css.mjs').then(m => m.default)}
  },
};
