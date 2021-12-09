module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx}", "./pages/**/*.{js,jsx}"],
  darkMode: "class", // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      maxWidth: {
        "8xl": "96rem",
      },
      maxHeight: {
        half: "50vh",
      },
      height: {
        100: "26.25rem",
        half: "50vh",
      },
      letterSpacing: {
        "17px": "17px",
        "18px": "18px",
        "19px": "19px",
        "0.23px": "0.23px",
      },
      lineHeight: {
        18: 18,
      },
      borderRadius: {
        square: "8px",
      },
      boxShadow: {
        dropdown: "0 3px 20px rgba(0, 0, 0, 0.25)",
        profileCamera: "0 3px 6px rgba(0, 0, 0, 0.29)",
        card: "0px 1px 2px rgba(0, 0, 0, 0.1)",
        button: "0px 1px 3px rgba(0, 0, 0, 0.15)",
        searchInput: "0px 5px 6px rgba(0, 0, 0, 0.12)",
      },
      screens: {
        xs: { max: "360px" },
        ph: { min: "200px", max: "499px" },
        btn: { min: "400px", max: "751px" },
        "3xl": { min: "1920px" },
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
      },
      colors: {
        caak: {
          primary: "#FF6600",
          primaryHover: "#FF8939",
          bleachedsilk: "#F2F2F2",
          aleutian: "#9A9FB4",
          liquidnitrogen: "#F3F3F4",
          1: "rgba(0, 0, 0, 0.16)",
          titaniumwhite: "#E4E4E5",
          upscale: "#A8AEC1",
          darkBlue: "#6C7392",
          extraBlack: "#0D1026",
          "extraBlack-hover": "#161b3f",
          blue: "#4B587C",
          2: "rgba(0, 0, 0, 0.15)",
          3: "rgba(0, 0, 0, 0.1)",
          yinbaisilver: "#E0E0E1",
          panipuri: "#F4AD57",
          hotembers: "#F75831",
          bluishpurple: "#6C41E4",
          blueoystercult: "#5079F1",
          iceclimber: "#2DEBD9",
          buttonblue: "#2196F3",
          christmassilver: "#E0E0E0",
          mercury: "#EBEBEB",
          posthover: "#F5F5F5",
          shiroiwhite: "#E8F6EE",
          algalfuel: "#2FC474",
          boilingmagma: "#FE3400",
          buffalosauce: "#F65a18",
          bleachedsilk1: "#F3F3F3",
          bleudefrance: "#367CE6",
          generalblack: "#21293C",
          secondprimary: "#F54000",
          mortargrey: "#9E9E9E",
          twitter: "#1Da1F2",
          facebook: "#1877F2",
          shit: "#AFAFAF",
          red: "#E60033",
          darkgray: "#A7A9AB",
          whitesmoke: "#f5f5f5",
          peachbreeze: "#FEECE5",
          washme: "#fafafc",
          absoluteapricot: "#ff963c",
          icingrose: "#F5EDE7",
          doctor: "#F9F9F9",
          carbonfootprint: "#7A7F8A",
          lynxwhite: "#F7F7F7",
          aliceblue: "#eff7fe",
          uclagold: "#FDB400",
          flashoforange: "#FDA900",
          fieryflamingo: "#FB6B7C",
          herablue: "#737EE6",
          bluerhapsody: "#3B4555",
          cherenkov: "#24B9F8",
          paperwhite: "#EFEFF2",
          pinkmirage: "#F4EEEA",
          lightmaidensblush: "#F5DDCE",
          cardinal: "#BE1E39",
          extraLight: "#F2F2F3",
          emptiness: "#FCFCFC",
          placeboblue: "#EDF5FE",
          sweetfrosting: "#FFF7E5",
          cookiedough: "#AC6D00",
          errigalwhite: "#F0F1F4",
          unicornsilver: "#E8E8E8",
        },
        darkblue: {
          DEFAULT: "#6C7392",
        },
        blue: {
          primary: "#4B587C",
          verified: "#2196F3",
        },
        gray: {
          primary: "#666666",
        },
        facebook: {
          DEFAULT: "#5f73a7",
          hover: "#4e5f8a",
        },
      },
      fontSize: {
        "4px": "4px",
        "9px": "9px",
        "11px": "11px",
        "12px": "12px",
        "13px": "13px",
        "14px": "14px",
        "15px": "15px",
        "16px": "16px",
        "17px": "17px",
        "18px": "18px",
        "20px": "20px",
        "22px": "22px",
        "24px": "24px",
        "26px": "26px",
        "28px": "28px",
        "30px": "30px",
        "40px": "40px",
        "44px": "44px",
        "56px": "56px",
      },
      fontFamily: {
        inter: ["Inter"],
      },
      spacing: {
        "px-2": "2px",
        "px-6": "6px",
        "px-7": "7px",
        "px-8": "8px",
        "px-9": "9px",
        "px-10": "10px",
        "px-11": "11px",
        "px-12": "12px",
        "px-34": "34px",
        "px-45": "45px",
        "px-154": "154px",
        "px-13px": "13px",
        "px-280": "280px",
        "px-260": "260px",
        c6: "15px",
        b5: "16px",
        b4: "17px",
        c1: "18px",
        c11: "20px",
        c2: "25px",
        c34: "28px",
        c4: "29px",
        c3: "30px",
        c24: "32px",
        c8: "35px",
        c25: "36px",
        c32: "37px",
        c13: "40px",
        c27: "41px",
        c37: "42px",
        c5: "43px",
        c9: "44px",
        c30: "48px",
        px50: "50px",
        c28: "52px",
        c15: "55px",
        c20: "68px",
        c60: "60px",
        c62: "62px",
        c7: "70px",
        c33: "72px",
        c29: "78px",
        c19: "90px",
        c31: "92px",
        c35: "97px",
        c14: "118px",
        c132: "132px",
        c36: "146px",
        c10: "155px",
        c12: "181px",
        c17: "196px",
        c26: "226px",
        c23: "240px",
        c22: "275px",
        c18: "278px",
        ch: "300px",
        ci: "320px",
        px360: "360px",
        cf: "356px",
        ce: "370px",
        ca: "390px",
        cb: "400px",
        cc: "450px",
        iw: "550x",
        ih: "546px",
        cl: "608px",
        sp: "220px",
        ck: "740px",
        cg: "854px",
      },
    },
  },
  variants: {
    extend: {
      placeholderColor: ["hover"],
      opacity: ["group-hover"],
      backdropBrightness: ["hover"],
      backdropFilter: ["hover"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
