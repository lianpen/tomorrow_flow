# 插件需求背景
## **插件目的：快出mock**
quickMock，快速mock插件，用于bff端接到需求后，快速生成mock数据，提供前端可调用的数据接口和接口文档。

当一个项目迭代开始时，后端,bff,前端开发互相依赖，容易形成串行的开发时间轴。如果前端可以尽快获得并可调用真实稳定的bff端接口，将极大提升前端开发体验和迭代效率。

quickMock插件用于确定需求后，只需定义数据格式接口，插件自动生成mock接口所需的绝大部分文件代码，直接打包至开发环境供前端使用。生成文件包括type, controller, mock, service四组文件。

## **快出mock将如何提升前端开发？**
1. 前端将直接看到真实的数据，而不是undefined，当然也无需自己的mock机制。
2. 前端将直接写action,无需二次调试。
3. 前端获得心理上的踏实感。我们对别人的文档会天然不信任，即使对着文档填了参数，心理上也是不确定真的可以走通。快出mock就直接调通了。
4. 前端获得了一份命名空间。前端想模块名和变量名是需要精力的。快出mock使前端在开发前就通过接口命名和参数命名获得了一份命名的依据。
5. 即使以后后端服务挂了，也不影响前端跑通流程。
6. Bff端为自己设定了约定，变向提升了前端的踏实感。BFF服务于前端，既然规则定下了，后续任务就是在service层用各种各样的手段完成自己定下的承诺。目标明确。
# 如何使用
1. 定义数据格式接口Types

根据前端所需的数据，在src/types目录下新建数据格式接口文件。本文以Team业务为例。

可定义多个文件，每个文件可定义多个接口。只对每个文件的第一个接口生成四组文件。

比如，为前端定义了如下接口文件:

```
/*
 * @Description: 团队
 * @Author: lianpen
 * @Date: 2019-10-14 17:52:46
 */
import { IPerson } from './Person'; 
export interface ITeam {
    /**
     * 团队队长 !example(马泽龙)
     * !e(马泽龙)
     * @example: 马泽龙
     * @e: 马泽龙
     * 给前端的接口文档上需要举例 example 可以写成上面4种形式
     * 若多次定义example 将选择最后一个
     * 字符串
     */
    leader: string; // 队长!e(马泽龙)
    id: number; // id 数字
    isTop: boolean; // 是否是明星团队 布尔
    /**
     * 团队名称
     * 大将风度；啦放假啦快速反击阿斯顿发
     * @example: 小龙队
     * 块级注释兼容行内注释 注释将叠加
     */
    name?: string; // 团队名称!example(大龙队)    
    /**
     * 口号列表 
     * 字符串数组
     * 1、用来宣传党和政府的路线、方针、政策的。
     * 2、用来宣传某机关、团体的规定、禁令的。
     * 3、用来宣传社会公共道德的。
     * 4、用来庆祝某个节日、某种会议，纪念某个名人、某个纪念日的。
     * 5、用来表彰先进、模范单位、人物的。
     * 6、用来欢迎、欢送某组织、团体或个人的。
     * 7、广告口号，标语等。
     */
    sloganList?: string[]; // 块级注释兼容行内注释 注释将叠加
    /**
     * 内联型对象成员 将识别下面定义的ISlogan
     */
    slogan?: ISlogan;
    /**
     * 外链型对象接口
     * 插件将加载外链的文件 识别这个对象接口
     */
    personList?: IPerson[]; // 人员列表 对象型数组 !e(中单打野辅助上单)
}
/**
 * 内联接口 提供ITeam引用
 */
export interface ISlogan {
    word: string; //口号
}
```
2. 执行quickMock命令
```
npm run quickMock company/Company.ts
```
指令带一个参数，参数可以是一个文件，也可以是一个文件夹
```
npm run quickMock company
```
如果是文件夹，则遍历文件夹下所有的ts文件，生成若干组文件
## 三、完成，编译，发布。
命令执行完成后，将生成4组文件。

控制台将打印如下：

```
quickMock 开始
开始解析文件：company/Team.ts
文件解析完成，开始打包
已生成文件:/Users/oyo01613/Desktop/lianpen2007/ops-biz-node/src/controllers/company-controller/getTeam.ts
已生成文件:/Users/oyo01613/Desktop/lianpen2007/ops-biz-node/src/mock/company/mockGetTeam.ts
已生成文件:/Users/oyo01613/Desktop/lianpen2007/ops-biz-node/src/services/company/getTeam.ts
已变换文件:/Users/oyo01613/Desktop/lianpen2007/ops-biz-node/src/types/company/Team.ts
quickMock 成功
```
其中controller，mock，service是新增的，而type是变换的。
type变换后将根据接口新增类。如果原type文件有3个接口，变换后将变成3个接口加3个类。

如果是文件夹，文件夹下有4个文件，那么将生成4*4=16个文件

然后测试接口，发布到开发环境，前端就可以用啦。

# 为什么要定义Type?
**因为Type被controller,service,mock三组文件共同依赖。**

1. 在controller中，我们原本会如下实现：
```
module.exports = {
    handler: async (request: Request): any => {
      const response: any = await xxxService(request.payload);
      // ...
      return response;
    }
}
```
那么response在typescript的数据类型只能是any，因为不同接口返回的数据格式是完全不同的，所以我们需要约定回参的数据格式。于是，我们引进Type:
```
import { ICompany } from '../../types/company/Company';
module.exports = {
    handler: async (request: Request): ICompany => {
      const result: ICompany = await xxxService(request.payload);
      // ...
      return result;
    }
}
```
这样result就获得了数据类型，就有可读性了。
1. 在service中，同样如此。如果没有type，我们会实现如下：
```
async function getTeam(hotelId: number): Promise<any> {}
  var result: any = {
    xx: 0,
    yy: 1
  };
  const resp = await DubboInterceptor(rpc.service.query());   
  result.xx = resp.xx;
  result.yy = resp.zz + '';
  //...
  return result
}
```
我们看到，result没有约定，从定义到最后的返回都是js的弱类型处理方式，我们不确定result.xx和result.yy是不是应该有的成员。应该引入Type:
```
import { ITeam, Team } from '../../types/company/Team';
async function getTeam(hotelId: number): Promise<ITeam> {
    const team: ITeam = new Team({
          leader: ''
    });
    team.leader = 'Xijinpin';
    // ....
    return team;
}
```
1. 在mock中，同样如此。
```
import { ITeam, Team } from '../../types/company/Team';
export const mockGetTeam: ITeam = new Team({
    id: '',
    name: '',
    personList: [],
    leader: null,
    sloganList: [],
});
export default mockGetTeam;
```
# Type定义规则
1. 变量数据类型支持三种基本类型（string, number, boolean)和自定义接口数据类型。不支持其他js自带数据类型，如（Date, RegExp,Promise)，也不支持引入的第三方数据类型。因为作为url上传递的参数是转换成json字符串的。自定义接口数据类型是为了json对象嵌套。
2. 块级注释和行内注释将叠加至Joi的description。
3. 注释中可以定义example 将编译至Joi的example 支持块级和行内 有四种方式：
```
    /**
     * !example(马泽龙)
     * !e(马泽龙)
     * @example: 马泽龙
     * @e: 马泽龙
     */
```
1. 支持数组，文件内内联自定义接口，跨文件外链自定义接口。to do better....
2. 一个文件可以定义多个接口，但只会对第一个接口生成controller等四组文件，其余接口应该是被第一个接口依赖的。如需要生成多个controller文件，应该建多个type文件。
# 实现分享
### 引进舞台Facade
我们知道接口间有互相依赖，一个对象可以是引用型对象，引用来源可以是文件内的定义的另一个接口，也可以是通过import另一个文件进来的外链接口。比如：

```
import ISlogon from '../../package/com/ISlogon';
export interface ITeam {
  slogon?: ISlogon;
  person?: IPerson;
}
export interface IPerson {
  name?: string;
  country?: ICountry;
}
export interface ICountry {
  name?: string;
}
```
ITeam依赖ISlogon和IPerson。其中ISlogon是外部引入的，IPerson是来自文件内的另一个接口。同时，引用也是无限递归的，比如IPerson又依赖了ICountry。那么对于外链的文件，我们自然有一个加载过程。
quickMock可以对一个文件夹内若干个接口做生成，与此同时，这若干接口又可以有互相依赖关系，那么就会产生加载和解析的重复和冲突了。为了使加载和解析接口文件有序可控，我们引进Facade。

Facade存储所有需要被加载的文件列表（astFileList）和所有涉及的接口（astInterfaceList)。文件和接口可能又需要导出又被依赖，可能是只需要导出，可能是只被依赖不需要导出。

我们用isMain标示是否需要导出，用isRequired标示是否被依赖。

### 定义四组数据模型
quickMock定义了四组核心的数据模型，IAstFile, IAstInterface,IAstVariable,IAstComment。我们维护的就是文件列表，每个文件有若干接口，每个接口有若干变量，他们三者都有注释。因为接口定义的限制，无法覆盖所有对前端接口所需的信息，所以就需要注释来辅助了。

```
/**
 * Ast文件
 */
export interface IAstFile {
  /**
   * 是否需要导出
   */
  isMain?: boolean;
  /**
   * 是否被依赖
   */
  isRequired?: boolean;
  /**
   * id 就用绝对路径
   */
  id: string;
  /**
   * 接口列表
   */
  astInterfaceList: IAstInterface[];
  /**
   * 第一个接口 根据第一个接口生成controller,service,mock
   */
  firstAstInterface?: IAstInterface;
}
/**
 * Ast接口
 */
export interface IAstInterface {
  /**
   * 是否需要导出
   */
  isMain?: boolean;
  /**
   * 是否被依赖
   */
  isRequired?: boolean;
  /**
   * id 因为不同文件可能有相同的接口名 所以需要id
   */
  id: string;
  /**
   * 对象列表
   */
  astVariableList: IAstVariable[];
}
/**
 * Ast变量
 */
export interface IAstVariable {
  /**
   * 键名
   */
  key: string;
  /**
   * 类型（string, number, bool, object..)
   */
  type: string;
  /**
   * 外链接口类型
   */
  typeAstInterface?: IAstInterface;
  /**
   * 是否是数组
   */
  isArray?: boolean;
  /**
   * 是否是基本类型
   */
  isBasicType?: boolean;
}

/**
 * Ast注释
 */
export interface IAstComment {
  /**
   * 块级注释
   */
  blockStr?: string;
  /**
   * 行内注释
   */
  inlineStr?: string;
  /**
   * 汇总
   */
  comment?: string;
  /**
   * 举例
   */
  example?: string;
```
### }

Ast三步走
接下来就是我们大名鼎鼎的Ast过程了。

因为上述提到交叉依赖的关系，我们第一步，一次性的加载所有的文件，然后只解析文件有import的这些行，然后递归地识别import的那个地址，再把那个地址的文件下载下来，统统加入Facade。这是一个异步递归，因为import的那个文件还可能import别的文件。对于import的文件，可能是一个相对路径，也可能是一个node_modules中的一个路径。我们只识别相对路径，因为node_modules中的文件不可能是我们需要的接口。

第二步，识别所有文件内接口，全部加入Facade，先不解析接口内部结构。为什么先不解析内部结构呢？因为对于接口中引用型对象，如果Facade中还没有这个被依赖的接口，那么这个IAstVariable的typeAstInterface就不知道指向谁了。所以要先确保Facade中有所有被依赖的接口。当然，解析到typeAstInterface的时候有一半概率是没有成员信息的接口，但是没有关系，因为typeAstInterface指向的是一个指针，当被依赖IAstInterface解析完成的时候，typeAstInterface也就有成员信息了。

第三步，逐个解析Facade中所有的IAstInterface内部成员。因为指针已经全部都对好了，所以只要Facade中的IAstInterfaceList解析完成，那么所有对象就都解析完成了。接下来就是经典Ast词法树解析了。

经典Ast算法，while字符串有剩余长度，自左开始慵懒匹配正则触发trigger，直至不再触发任何trigger或到结尾。quickMock牵涉到匹配如下：

```
const REGEX_MAP = {
  FILE_IMPORT: /^\s*(\/\*.*?\*\/)?\s*import\s+\{\s+(\w?)+\s+\}\s+from\s+[\'\"](.*)[\'\"]\;/,
  FILE_INTERFACE: /^\s*(\/\*.*?\*\/)?\s*export\s*interface\s*(\w+?)\s*\{(.*?)\}/,
  INTERFACE_VARIABLE: /^(\t\t\t\t)?\s*(\/\*.*?\*\/)?\s*(\w+?)\??\:\s*(\w+?)(\[\])?\;\s*(\/\/.*?)?\t\t\t\t/,
  COMMENT_BLOCK_HEADER: new RegExp('\\*+\\s*(.*)'),
  COMMENT_INLINE_HEADER: new RegExp('\\/\\/\\s*(.*)'),
  COMMENT_INLINE_EXAMPLE: new RegExp('\\!(e|example)\\((.*)\\)'),
  COMMENT_BLOCK_EXAMPLE: new RegExp('\\@(e|example)\\:\\s*(.*)'),
};
```
### patch四组文件
type文件包含的信息可以囊括controller，service，mock所需的绝大部分信息，但是controller中所需的一些信息是不包括的，比如controller中的validate，比如前端要的可能是数组，但是Type定义的是对象。我们patch出可以包括的信息，不能包括的尽量用注释补足，最后才手动调整。于是，我们对所有入口文件做4组patch。

```
async function patch(astFiles: IAstFile[]) {
  for (let i: number = 0; i < astFiles.length; i += 1) {
    await patchController(astFiles[i]);
    await patchMock(astFiles[i]);
    await patchService(astFiles[i]);
    await patchType(astFiles[i]);
  }
}
```
对于每组patch，实现思路都是一样的。根据模版生成内容，创建文件夹，创建文件。
```
    const paramsMaker: IParamsMaker = new ParamsMaker(this.astFile);
    await paramsMaker.run();
    await this.makeDir();
    await this.makeFile();
```
生成内容根据变量是否是基本对象，是否是数组差异处理。如果不是基本对象，那么是递归的。
```
  parseInterface(astInterface: IAstInterface) {
    astInterface.astVariableList.forEach((variable: IAstVariable) => {
      const { isArray, isBasicType } = variable;
      if (isArray && isBasicType) {
        this.parseArray(variable);
      } else if (!isArray && isBasicType) {
        this.parseVariable(variable);
      } else if (!isArray && !isBasicType) {
          // ...
          this.parseInterface(variable.typeAstInterface);
      } else if (isArray && !isBasicType) {
        this.parseComplexArray(variable);
      }
    });
  }
```





