
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/Interview-Scheduler-frontend/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/Interview-Scheduler-frontend/home"
  },
  {
    "renderMode": 2,
    "route": "/Interview-Scheduler-frontend/login"
  },
  {
    "renderMode": 2,
    "route": "/Interview-Scheduler-frontend/verify-otp"
  },
  {
    "renderMode": 2,
    "route": "/Interview-Scheduler-frontend/network-error"
  },
  {
    "renderMode": 2,
    "route": "/Interview-Scheduler-frontend/changepassword"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2IQBELJQ.js"
    ],
    "route": "/Interview-Scheduler-frontend/admindashboard"
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
    "route": "/Interview-Scheduler-frontend/admindashboard/user-management"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2IQBELJQ.js",
      "chunk-WNL6AGL5.js",
      "chunk-7RAIQIRP.js"
    ],
    "route": "/Interview-Scheduler-frontend/admindashboard/role-management"
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
    "route": "/Interview-Scheduler-frontend/panel-coordinator"
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
    "route": "/Interview-Scheduler-frontend/panel-coordinator/dashboard"
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
    "route": "/Interview-Scheduler-frontend/panel-coordinator/all-panelMembers"
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
    "route": "/Interview-Scheduler-frontend/panel-coordinator/map-panel-member"
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
    "route": "/Interview-Scheduler-frontend/panel-coordinator/mapped-panel-member"
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
    "route": "/Interview-Scheduler-frontend/panel-coordinator/allocate-panel-window"
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
    "route": "/Interview-Scheduler-frontend/panel-coordinator/panel-windows"
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
    "route": "/Interview-Scheduler-frontend/panel-coordinator/panel-calendar"
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
    "route": "/Interview-Scheduler-frontend/panel-member"
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
    "route": "/Interview-Scheduler-frontend/panel-member/dashboard"
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
    "route": "/Interview-Scheduler-frontend/panel-member/get-slots"
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
    "route": "/Interview-Scheduler-frontend/panel-member/panel-member-calendar"
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
    "route": "/Interview-Scheduler-frontend/panel-member/panel-member-window"
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
    "route": "/Interview-Scheduler-frontend/panel-member/slot-form"
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
    "route": "/Interview-Scheduler-frontend/tadmin"
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
    "route": "/Interview-Scheduler-frontend/tadmin/dashboard"
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
    "route": "/Interview-Scheduler-frontend/tadmin/interview-list"
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
    "route": "/Interview-Scheduler-frontend/tadmin/calendar"
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
    "route": "/Interview-Scheduler-frontend/ta-recruiter"
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
    "route": "/Interview-Scheduler-frontend/ta-recruiter/tadashboard"
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
    "route": "/Interview-Scheduler-frontend/ta-recruiter/slot-list"
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
    "route": "/Interview-Scheduler-frontend/ta-recruiter/schedule-calendar"
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
    "route": "/Interview-Scheduler-frontend/ta-recruiter/scheduled-interviews"
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
    "route": "/Interview-Scheduler-frontend/reporting-manager"
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
    "route": "/Interview-Scheduler-frontend/reporting-manager/dashboard"
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
    "route": "/Interview-Scheduler-frontend/reporting-manager/team-members"
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
    "route": "/Interview-Scheduler-frontend/reporting-manager/reporting-manager-calendar"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-IPECC6QC.js",
      "chunk-WG3S2NED.js"
    ],
    "route": "/Interview-Scheduler-frontend/candidate"
  },
  {
    "renderMode": 2,
    "route": "/Interview-Scheduler-frontend/unauthorized"
  },
  {
    "renderMode": 2,
    "redirectTo": "/Interview-Scheduler-frontend/login",
    "route": "/Interview-Scheduler-frontend/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 31119, hash: '5f08a5c98d0e7ecf8693dfe810570aa95749eb003e0870b355271d1b8f0e62eb', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17509, hash: '24df912389b76789bf44dff9e7ab7edf3a619394a2da921cefb8a99a949de7af', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'home/index.html': {size: 37244, hash: '72bc37fa720baa0d3ee7323fb4f703400fea133f95cacf88beb8a26f8fad2c10', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'network-error/index.html': {size: 38504, hash: '82f066f7db135a1b1294dd3484a91db65f0de1e4028ae79de6e6b523e1ee9e82', text: () => import('./assets-chunks/network-error_index_html.mjs').then(m => m.default)},
    'changepassword/index.html': {size: 36344, hash: '5e7a65399c8eec8cdb3a5a4d4db988a0fccc49c1c309cff8fa92ff76ceb2204d', text: () => import('./assets-chunks/changepassword_index_html.mjs').then(m => m.default)},
    'admindashboard/index.html': {size: 36397, hash: '0f81471be623629f0d7961c3ed11535c3718202bdfbf99a3111d5764b218b7f4', text: () => import('./assets-chunks/admindashboard_index_html.mjs').then(m => m.default)},
    'admindashboard/user-management/index.html': {size: 36657, hash: 'f7a8eb663450a9a97846ad9937f48fa5bd138a0185003d034130086c70e3a0e7', text: () => import('./assets-chunks/admindashboard_user-management_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 36344, hash: '5e7a65399c8eec8cdb3a5a4d4db988a0fccc49c1c309cff8fa92ff76ceb2204d', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admindashboard/role-management/index.html': {size: 36501, hash: 'af8addcd6497c3309c3d09abda62bc0b8c10e8a6ec294b98db0ed2fd3b027579', text: () => import('./assets-chunks/admindashboard_role-management_index_html.mjs').then(m => m.default)},
    'verify-otp/index.html': {size: 36344, hash: '5e7a65399c8eec8cdb3a5a4d4db988a0fccc49c1c309cff8fa92ff76ceb2204d', text: () => import('./assets-chunks/verify-otp_index_html.mjs').then(m => m.default)},
    'panel-coordinator/dashboard/index.html': {size: 36865, hash: '438224b767bd19c0e22b5c5b5606528db09c2c0520b052af0d795c09b247ea99', text: () => import('./assets-chunks/panel-coordinator_dashboard_index_html.mjs').then(m => m.default)},
    'panel-coordinator/index.html': {size: 36865, hash: '438224b767bd19c0e22b5c5b5606528db09c2c0520b052af0d795c09b247ea99', text: () => import('./assets-chunks/panel-coordinator_index_html.mjs').then(m => m.default)},
    'panel-coordinator/map-panel-member/index.html': {size: 36865, hash: '438224b767bd19c0e22b5c5b5606528db09c2c0520b052af0d795c09b247ea99', text: () => import('./assets-chunks/panel-coordinator_map-panel-member_index_html.mjs').then(m => m.default)},
    'panel-coordinator/all-panelMembers/index.html': {size: 36865, hash: '438224b767bd19c0e22b5c5b5606528db09c2c0520b052af0d795c09b247ea99', text: () => import('./assets-chunks/panel-coordinator_all-panelMembers_index_html.mjs').then(m => m.default)},
    'panel-coordinator/allocate-panel-window/index.html': {size: 36865, hash: '438224b767bd19c0e22b5c5b5606528db09c2c0520b052af0d795c09b247ea99', text: () => import('./assets-chunks/panel-coordinator_allocate-panel-window_index_html.mjs').then(m => m.default)},
    'panel-coordinator/mapped-panel-member/index.html': {size: 36865, hash: '438224b767bd19c0e22b5c5b5606528db09c2c0520b052af0d795c09b247ea99', text: () => import('./assets-chunks/panel-coordinator_mapped-panel-member_index_html.mjs').then(m => m.default)},
    'panel-coordinator/panel-windows/index.html': {size: 36865, hash: '438224b767bd19c0e22b5c5b5606528db09c2c0520b052af0d795c09b247ea99', text: () => import('./assets-chunks/panel-coordinator_panel-windows_index_html.mjs').then(m => m.default)},
    'panel-coordinator/panel-calendar/index.html': {size: 36865, hash: '438224b767bd19c0e22b5c5b5606528db09c2c0520b052af0d795c09b247ea99', text: () => import('./assets-chunks/panel-coordinator_panel-calendar_index_html.mjs').then(m => m.default)},
    'panel-member/index.html': {size: 36865, hash: '94d97a089c692dbfb3758f86cfeded761880f0c55bf7594ac7756c195714fe69', text: () => import('./assets-chunks/panel-member_index_html.mjs').then(m => m.default)},
    'panel-member/panel-member-calendar/index.html': {size: 36865, hash: '94d97a089c692dbfb3758f86cfeded761880f0c55bf7594ac7756c195714fe69', text: () => import('./assets-chunks/panel-member_panel-member-calendar_index_html.mjs').then(m => m.default)},
    'panel-member/get-slots/index.html': {size: 36865, hash: '94d97a089c692dbfb3758f86cfeded761880f0c55bf7594ac7756c195714fe69', text: () => import('./assets-chunks/panel-member_get-slots_index_html.mjs').then(m => m.default)},
    'panel-member/dashboard/index.html': {size: 36865, hash: '94d97a089c692dbfb3758f86cfeded761880f0c55bf7594ac7756c195714fe69', text: () => import('./assets-chunks/panel-member_dashboard_index_html.mjs').then(m => m.default)},
    'panel-member/slot-form/index.html': {size: 36865, hash: '94d97a089c692dbfb3758f86cfeded761880f0c55bf7594ac7756c195714fe69', text: () => import('./assets-chunks/panel-member_slot-form_index_html.mjs').then(m => m.default)},
    'panel-member/panel-member-window/index.html': {size: 36865, hash: '94d97a089c692dbfb3758f86cfeded761880f0c55bf7594ac7756c195714fe69', text: () => import('./assets-chunks/panel-member_panel-member-window_index_html.mjs').then(m => m.default)},
    'tadmin/interview-list/index.html': {size: 36813, hash: 'b929f291e4f1792eb368cc0ec5a455ae446fbc77861e54426db553177b34a102', text: () => import('./assets-chunks/tadmin_interview-list_index_html.mjs').then(m => m.default)},
    'tadmin/dashboard/index.html': {size: 36813, hash: 'b929f291e4f1792eb368cc0ec5a455ae446fbc77861e54426db553177b34a102', text: () => import('./assets-chunks/tadmin_dashboard_index_html.mjs').then(m => m.default)},
    'tadmin/index.html': {size: 36813, hash: 'b929f291e4f1792eb368cc0ec5a455ae446fbc77861e54426db553177b34a102', text: () => import('./assets-chunks/tadmin_index_html.mjs').then(m => m.default)},
    'tadmin/calendar/index.html': {size: 36813, hash: 'b929f291e4f1792eb368cc0ec5a455ae446fbc77861e54426db553177b34a102', text: () => import('./assets-chunks/tadmin_calendar_index_html.mjs').then(m => m.default)},
    'ta-recruiter/tadashboard/index.html': {size: 36761, hash: 'bf52bd1a8fc6204c8483f2e6ab7bdd31c50ca53b10330e58e816a2b4546e4bbe', text: () => import('./assets-chunks/ta-recruiter_tadashboard_index_html.mjs').then(m => m.default)},
    'ta-recruiter/index.html': {size: 36761, hash: 'bf52bd1a8fc6204c8483f2e6ab7bdd31c50ca53b10330e58e816a2b4546e4bbe', text: () => import('./assets-chunks/ta-recruiter_index_html.mjs').then(m => m.default)},
    'ta-recruiter/schedule-calendar/index.html': {size: 36761, hash: 'bf52bd1a8fc6204c8483f2e6ab7bdd31c50ca53b10330e58e816a2b4546e4bbe', text: () => import('./assets-chunks/ta-recruiter_schedule-calendar_index_html.mjs').then(m => m.default)},
    'ta-recruiter/scheduled-interviews/index.html': {size: 36761, hash: 'bf52bd1a8fc6204c8483f2e6ab7bdd31c50ca53b10330e58e816a2b4546e4bbe', text: () => import('./assets-chunks/ta-recruiter_scheduled-interviews_index_html.mjs').then(m => m.default)},
    'ta-recruiter/slot-list/index.html': {size: 36761, hash: 'bf52bd1a8fc6204c8483f2e6ab7bdd31c50ca53b10330e58e816a2b4546e4bbe', text: () => import('./assets-chunks/ta-recruiter_slot-list_index_html.mjs').then(m => m.default)},
    'reporting-manager/index.html': {size: 36761, hash: '35b9a56bc9526519068d074e19ed1e8d75192c9cbdacf37052d28020b2215ca3', text: () => import('./assets-chunks/reporting-manager_index_html.mjs').then(m => m.default)},
    'reporting-manager/dashboard/index.html': {size: 36761, hash: '35b9a56bc9526519068d074e19ed1e8d75192c9cbdacf37052d28020b2215ca3', text: () => import('./assets-chunks/reporting-manager_dashboard_index_html.mjs').then(m => m.default)},
    'candidate/index.html': {size: 36449, hash: '12cb5ef71eb2db5c731f2b1e2b5c88b8af7d69f445e119d6de1a70327ea86438', text: () => import('./assets-chunks/candidate_index_html.mjs').then(m => m.default)},
    'reporting-manager/team-members/index.html': {size: 36761, hash: '35b9a56bc9526519068d074e19ed1e8d75192c9cbdacf37052d28020b2215ca3', text: () => import('./assets-chunks/reporting-manager_team-members_index_html.mjs').then(m => m.default)},
    'reporting-manager/reporting-manager-calendar/index.html': {size: 36761, hash: '35b9a56bc9526519068d074e19ed1e8d75192c9cbdacf37052d28020b2215ca3', text: () => import('./assets-chunks/reporting-manager_reporting-manager-calendar_index_html.mjs').then(m => m.default)},
    'unauthorized/index.html': {size: 37047, hash: 'e13603f7063e0001fd19f0d5d0f908f22b3e6fb052c01d0ab026b9aace7104e1', text: () => import('./assets-chunks/unauthorized_index_html.mjs').then(m => m.default)},
    'styles-IDY6Z7HY.css': {size: 42144, hash: 'hj+Ds5H6n2o', text: () => import('./assets-chunks/styles-IDY6Z7HY_css.mjs').then(m => m.default)}
  },
};
