document.addEventListener('DOMContentLoaded', () => {
  const translations = {
    navAbout: { ko: '단체 소개', en: 'About Us' },
    navProjects: { ko: '프로젝트', en: 'Projects' },
    navTrans: { ko: '투명성', en: 'Transparency' },
    navNews: { ko: '활동 소식', en: 'News' },
    navDonate: { ko: '후원하기', en: 'Donate' },
    footerDesc: { ko: '청소년이 만드는 투명한 나눔', en: 'Transparent giving led by youth' },

    transparency_doc: { ko: '투명성 보고 | Lemonade For All', en: 'Transparency Report | Lemonade For All' },
    transparency_title: { ko: '투명성 보고', en: 'Transparency Report' },
    transparency_sub: { ko: '모든 기부금과 물품의 흐름을 투명하게 공개합니다', en: 'We openly share how donations and goods are received and used' },

    trans_establishment: { ko: '설립 정보', en: 'Organization Details' },
    trans_established_label: { ko: '설립일', en: 'Date Established' },
    trans_establish_date: { ko: '2026.02', en: 'February 2026' },
    trans_registration_number: { ko: '등록번호', en: 'Registration Number' },
    trans_org_type_label: { ko: '법인형태', en: 'Organization Type' },
    trans_org_type: { ko: '비영리 임의단체', en: 'Nonprofit Voluntary Organization' },

    trans_financial: { ko: '재정 투명성', en: 'Financial Transparency' },
    finance_sheet_link: { ko: '재정 현황 스프레드시트 바로가기', en: 'Open Financial Spreadsheet' },

    trans_total_label: { ko: '총 기부금', en: 'Total Donations' },
    trans_direct_label: { ko: '프로그램 직접 지원', en: 'Direct Program Support' },
    trans_ops_label: { ko: '운영비', en: 'Operating Costs' },
    trans_edu_label: { ko: '교육 및 캠페인', en: 'Education and Campaigns' },

    trans_total_value: { ko: '약 50만원', en: 'About KRW 500,000' },
    trans_direct_value: { ko: '42만 5천원', en: 'KRW 425,000' },
    trans_ops_value: { ko: '5만원', en: 'KRW 50,000' },
    trans_edu_value: { ko: '2만 5천원', en: 'KRW 25,000' },

    trans_total_table_value: { ko: '500,000원', en: 'KRW 500,000' },
    trans_direct_table_value: { ko: '425,000원', en: 'KRW 425,000' },
    trans_ops_table_value: { ko: '50,000원', en: 'KRW 50,000' },
    trans_edu_table_value: { ko: '25,000원', en: 'KRW 25,000' },

    finance_table_caption: { ko: '기부금 사용 현황', en: 'Donation Use Overview' },
    finance_col_item: { ko: '항목', en: 'Category' },
    finance_col_amount: { ko: '금액', en: 'Amount' },

    trans_fin_principles: { ko: '재정 원칙', en: 'Financial Principles' },
    trans_fin_principles_desc: {
      ko: '레모네이드 포 올은 모든 후원금을 투명하게 관리합니다. 정관에 따라 모든 수입과 지출을 정확하게 기록하고, 분기별 보고서를 통해 후원자들에게 공개합니다.',
      en: 'Lemonade For All manages all donations transparently. We keep accurate records of all income and spending and share quarterly reports with our supporters.'
    },

    trans_report_period: { ko: '보고 주기', en: 'Reporting Schedule' },
    trans_report_period_desc: {
      ko: '매 분기마다 재정 보고서를 작성하여 웹사이트에 공개하며, 주요 후원 내역과 프로젝트 진행 상황을 후원자에게 안내합니다. 주요 프로젝트 완료 시에는 별도의 결과 보고서를 발행합니다.',
      en: 'We publish financial reports every quarter on our website and share major updates on donations and project progress with supporters. We also issue separate reports when major projects are completed.'
    },

    trans_recent_activities: { ko: '최근 활동', en: 'Recent Activities' },
    trans_activity_1: {
      ko: '캄보디아 프놈펜 지역 고아원에 의류 및 보건 물품 기부',
      en: 'Donated clothing and health supplies to an orphanage in Phnom Penh, Cambodia'
    },
    trans_activity_2: {
      ko: 'Lemonade For All 공식 설립',
      en: 'Lemonade For All officially founded'
    },

    trans_partner: { ko: '협력 단체', en: 'Partner Organization' },
    trans_partner_desc: {
      ko: '태화복지재단과의 협력을 통해 물품 전달 과정을 기록하고, 현장 전달 내역을 투명하게 공유합니다.',
      en: 'In partnership with Taehwa Welfare Foundation, we document the delivery process and share field updates transparently.'
    }
  };

  let currentLang = 'ko';

  function safeGetStoredLang() {
    try {
      return localStorage.getItem('siteLang') || 'ko';
    } catch (error) {
      return 'ko';
    }
  }

  function safeSetStoredLang(lang) {
    try {
      localStorage.setItem('siteLang', lang);
    } catch (error) {}
  }

  function updateLangButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const nextLabel = currentLang === 'ko' ? 'Switch to English' : 'Switch to Korean';
      btn.textContent = currentLang === 'ko' ? 'ENG' : '한국어';
      btn.setAttribute('aria-label', nextLabel);
      btn.setAttribute('aria-pressed', currentLang === 'en' ? 'true' : 'false');
      btn.setAttribute('type', 'button');
    });
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const entry = translations[key];

      if (!entry) {
        console.warn(`Missing translation key: ${key}`);
        return;
      }

      if (!entry[currentLang]) {
        console.warn(`Missing ${currentLang} translation for key: ${key}`);
        return;
      }

      el.textContent = entry[currentLang];
    });

    document.documentElement.lang = currentLang;
    updateLangButtons();
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentLang = currentLang === 'ko' ? 'en' : 'ko';
      safeSetStoredLang(currentLang);
      applyTranslations();
    });
  });

  currentLang = safeGetStoredLang();
  applyTranslations();
});
