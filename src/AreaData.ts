class AreaData {
  private constructor() {
    // private constructor
    // 이 클래스의 인스턴스는 메소드를 통해서만 생성합니다.
  }

  우편번호!: string;
  시도!: string;
  시도영문!: string;
  시군구!: string;
  시군구영문!: string;
  읍면!: string;
  읍면영문!: string;
  도로명코드!: string;
  도로명!: string;
  도로명영문!: string;
  지하여부!: string;
  건물번호본번!: string;
  건물번호부번!: string;
  건물관리번호!: string;
  다량배달처명!: string;
  시군구용건물명!: string;
  법정동코드!: string;
  법정동명!: string;
  리명!: string;
  행정동명!: string;
  산여부!: string;
  지번본번!: string;
  읍면동일련번호!: string;
  지번부번!: string;
  구우편번호!: string;
  우편번호일련번호!: string;

  static parseRawText(text: string): AreaData[] {
    function splitByPipeAndTrim(string: string): string[] {
      return string.split('|').map((s) => s.trim());
    }

    const results: AreaData[] = [];
    const [keysRawText, ...dataRawTextLines] = text.split('\n');
    const keys = splitByPipeAndTrim(keysRawText);

    for (const line of dataRawTextLines) {
      const areaData = new AreaData();
      const dataList = splitByPipeAndTrim(line);

      for (let index = 0; index < dataList.length; index++) {
        const data = dataList[index];
        const key = keys[index] as keyof AreaData;
        areaData[key] = data;
      }

      results.push(areaData);
    }

    return results;
  }
}

export default AreaData;
