# 벨로퍼트와 함께하는 리액트 테스팅

이 저장소는 velopert님의 [벨로퍼트와 함께하는 리액트 테스팅](https://velog.io/@velopert/series/react-testing) 을 공부하며 작성한 TDD 연습 저장소 입니다. 

저장소를 저장하기 앞서 대략적인 줄거리를 써 보겠습니다.

You must install 

- Node.js
- yarn or npm



## 1장 벨로퍼트와 함께하는 리액트 테스팅

- 테스트란?

우리가 작성한 코드가 잘 작동한다는 것을 검증하는 작업을 의미, 결국 테스트 자동화란 테스트 하는 코드를 작성하여 테스트 시스템이 자동으로 확인 할 수 있도록 하는 것임.

- 테스트 자동화의 장점

테스트 코드를 사용하면 우리가 프로젝트를 개발하는 과정에서 우리가 써내려가는 코드가 기존의 기능들을 실수로 망가뜨리는것을 아주 효과적으로 방지 할 수 있습니다. 또한 개발하게 될 떄 실제 발생 할 수 있게 되는 상황에 대하여 미리 정리해놓고 그에 맞춰 코드를 작성하게 되면 우리가 실수로 빠뜨릴 수 있는 사항들을 까먹지 않고 잘 챙길 수 있게 됩니다.

이 뿐만이 아닙니다. 코드를 리팩토링 할 때 정말 좋습니다.

- 유닛테스트와 통합 테스트로 되어 있습니다.

- 유닛테스트

  - 컴포넌트가 잘 렌더링된다.
  - 컴포넌트의 특정 함수를 실행하면 상태가 우리가 원하는 형태로 바뀐다
  - 리덕스의 액션 생성 함수가 액션 객체를 잘 만들어낸다
  - 리덕스의 리듀서에 상태와 액션객체를 넣어서 호출하면 새로운 상태를 잘 만들어준다.

  말 그대로 개별로 잘 쪼개서 테스트 하는 것입니다. 

- 통합테스트

  - 여러 컴포넌트들을 렌더링하고 서로 상호 작용을 잘 하고 있다
  - DOM 이벤트를 발생 시켰을 때 우리의 UI 에 원하는 변화가 잘 발생한다
  - 리덕스와 연동된 컨테이너 컴포넌트의 DOM 에 특정 이벤트를 발생시켰을 때 우리가 원하는 액션이 잘 디스패치 된다

  말 그대로 유닛을  통합하여 테스트 하는 것입니다.

 

## 2장 자바스크립트 테스팅의 기초

- 자바스크립트로 작성된 프로젝트에 테스트 자동화 할 수 있는 도구는?

  - Karma
  - Jasmine
  - Jest
  - Chai
  - Mocha

  즉 다양합니다. 이 도구들은 비슷한 작업을 처리하지만 각각 다른 특성들을 가지고 있습니다. 각 도구들의 차이점들을 보고 싶으시다면 이 [링크](https://medium.com/welldone-software/an-overview-of-javascript-testing-in-2019-264e19514d0a)를 읽어보시면 도움 이 될 수 있습니다. 이 튜토리얼에서는, 설정이 간단하고 시작하기 편한 Jest를 사용하겠습니다.

- describe와 it을 사용합니다.

예제

#### sum.test.js

```js
const { sum, sumOf } = require('./sum');

describe('sum', () => {
  it('calculates 1 + 2', () => {
    expect(sum(1, 2)).toBe(3);
  });

  it('calculates all numbers', () => {
    const array = [1, 2, 3, 4, 5];
    expect(sumOf(array)).toBe(15);
  });
});
```

#### sum.js

```js
function sum(a,b){
  return a+b;
}
function sumOf(numbers){
  return numbers.reduce((acc,current)=> acc+ current , 0);
}
exports.sum = sum;
exports.sumOf = sumOf;
```



## 3장 TDD의 소개

### TDD란?

TDD (Test Driven Development · 테스트 주도 개발) 에 대해서 알아봅시다! TDD 는 테스트가 개발을 이끌어 나가는 형태의 개발론입니다.
가장 쉽게 설명하자면, 선 테스트 코드 작성, 후 구현 인데요, 이는 총 3가지 주요 절차로 이루어져있습니다.

![img](https://i.imgur.com/wcbaeLC.png)

### TDD 의 3가지 절차

#### 실패

첫번째 절차는 실패입니다. 이는, 실패하는 테스트 케이스를 먼저 만들라는 것 입니다. 실패하는 테스트 케이스를 만들 때는 프로젝트의 전체 기능에 대하여 처음부터 모든 테스트 케이스를 작성하는 것이 아니라, 지금 가장 먼저 구현할 기능 하나씩 테스트 케이스를 작성합니다.

> 개발팀/상황에 따라 한꺼번에 여러 테스트 케이스를 먼저 작성하기도 합니다.

##### 성공

두번째 절차는 성공입니다. 우리가 작성하는 실패하는 테스트 케이스를 통과시키기 위하여, 코드를 작성하여 테스트를 통과시키는 것 입니다.

##### 리팩토링

세번째 절차는 리팩토링입니다. 우리가 구현한 코드에 중복되는 코드가 있거나, 혹은 더 개선시킬 방법이 있다면 리팩토링을 진행합니다. 리팩토링을 진행하고 나서도 테스트 케이스가 성공하는지 확인합니다. 이 절차가 끝났다면, 다시 첫번째 절차로 돌아가서 다음 기능 구현을 위하여 새로운 실패하는 테스트 케이스를 작성하세요.

### TDD 의 장점

TDD 를 진행하면서 테스트 케이스를 작성할때 주로 작은 단위로 만들기 때문에, 코드를 작성 할 때 코드가 너무 방대해지지 않고, 코드의 모듈화가 자연스럽게 잘 이루어지면서 개발이 진행됩니다.

TDD 를 하면 자연스레 테스트 커버리지가 높아질 수 밖에 없습니다. 테스트를 먼저 작성을 하고 구현을 하니까요. 테스트 커버리지가 높아지면 결국 리팩토링도 쉬워지고 유지보수도 쉬워집니다. 결국 프로젝트의 퀄리티를 높이기에 좋은 환경이 구성됩니다. 추가적으로, 협업을 할때도 매우 도움이 되지요.

그리고, 버그에 낭비하는 시간도 최소한으로 할 수 있고 우리가 구현한 기능이 요구사항을 충족하는지 쉽게 확인 할 수 있습니다.

### TDD 연습

이번 연습에서는 배열이 주어졌을 때 최댓값, 최솟값, 평균, 중앙값, 최빈값을 구하는 함수들을 구현해보겠습니다.

- 최댓값
  - Math.max사용

- 최솟값
  - Math.min사용

```javascript
expect(stats.max([1, 2, 3, 4])).toBe(4);
```

값을 확인할 때는 expect와 toBe 사용

- 평균값

  - reduce 와 length 사용

- 중앙값.

  중앙값을 찾기위해 sort 기능을 사용해야함

  - sort

    - 테스트 코드

    ```javascript
     it('sorts the array', () => {
          expect(stats.sort([5, 4, 1, 2, 3])).toEqual([1, 2, 3, 4, 5]);
       
    ```

    

    - 작성 코드

    ```javascript
    exports.sort = numbers => numbers.sort((a, b) => a - b);
    
    ```

  - 최종 테스트 코드

  ```javascript
    describe('median', () => {
      it('sorts the array', () => {
        expect(stats.sort([5, 4, 1, 2, 3])).toEqual([1, 2, 3, 4, 5]);
      });
      it('gets the median for odd length', () => {
        expect(stats.median([1, 2, 3, 4, 5])).toBe(3);
      });
      it('gets the median for even length', () => {
        expect(stats.median([1, 2, 3, 4, 5, 6])).toBe(3.5);
      });
    });
  ```

  

  - 최종 작성 코드

  ```javascript
  exports.median = numbers => {
    const middle = Math.floor(numbers.length / 2);
  
    if (numbers.length % 2) {
      // 홀수
      return numbers[middle];
    }
    return (numbers[middle - 1] + numbers[middle]) / 2;
  };
  ```

- 최빈값

테스트 코드

```javascript
  describe('mode', () => {
    it('has one mode', () => {
      expect(stats.mode([1, 2, 2, 2, 3])).toBe(2);
    });
    it('has no mode', () => {
      expect(stats.mode([1, 2, 3])).toBe(null);
    });
    it('has multiple mode', () => {
      expect(stats.mode([1, 2, 2, 3, 3, 4])).toEqual([2, 3]);
    });
```

작성 코드

```javascript
exports.mode = numbers => {
  const counts = numbers.reduce(
    (acc, current) => acc.set(current, acc.get(current) + 1 || 1),
    new Map()
  );

  const maxCount = Math.max(...counts.values());
  const modes = [...counts.keys()].filter(
    number => counts.get(number) === maxCount
  );

  if (modes.length === numbers.length) {
    // 최빈값이 없음
    return null;
  }

  if (modes.length > 1) {
    // 최빈값이 여러개
    return modes;
  }

  // 최빈값이 하나
  return modes[0];
};
```

## 4장 리액트 테스트의 소개

- Enzyme 과 react-testing-library의 소개

리액트 공식문서에서 사용을 권장하는 라이브러리는 [`react-testing-library`](https://git.io/react-testing-library) 입니다. 그리고, 대체방안으로 [`Enzyme`](https://airbnb.io/enzyme/) 이 있다고 언급을 하고 있습니다.

2년 전까지는 airbnb 에서 만든 Enzyme 을 사용하는것이 가장 좋은 솔루션이였는데요, 요즘은 react-testing-library 가 많은 주목을 받고 있습니다. Enzyme 의 경우엔 2015년부터 개발이 되었고 react-testing-library 의 경우엔 2018년부터 개발이 되어 2018년 말부터 급부상을 하고 있습니다.

![img](https://i.imgur.com/qJLVvjk.png)



Enzyme 과 react-testing-library 는 서로 다른 철학을 가지고 있습니다. Enzyme 을 사용하여 테스트 코드를 작성 할 때에는 컴포넌트의 내부 기능을 자주 접근합니다. 예를 들어서 컴포넌트가 지니고 있는 props, state 를 확인하고, 컴포넌트의 내장 메서드를 직접 호출하기도 합니다.

react-testing-library는 반면 렌더링 결과에 조금 더 집중을 합니다. 실제 DOM 에 대해서 신경을 더 많이 쓰고, 컴포넌트의 인스턴스에 대해서 신경쓰지 않고, 실제 화면에 무엇이 보여지는지, 그리고 어떠한 이벤트가 발생했을때 화면에 원하는 변화가 생겼는지 이런 것을 확인하기에 조금 더 최적화 되어있습니다. 그래서, react-testing-library 는 조금 더 사용자의 관점에서 테스팅하기에 더욱 용이합니다.



## 5장 Enzyme을 사용한 리액트 컴포넌트 테스트

mount 사용

- snapshot확인
  - 이전의 스냅샷과 비교, 같으면 PASS 틀리면 Fail 
  - 현재가 최신이라면 U로 업데이트 
- Props에 username, name을 작성하여 접근 확인
- DOM 확인
  -  find 메소드
- 클래스형 컴포넌트
- DOM  이벤트 시뮬레이트
  - 숫자 올리기 (버튼)
  - 숫자 내리기 (버튼)
  - 체인지 (인풋 돔)
- 함수형 컴포넌트와 Hooks 테스팅
  - Hooks를 사용시 shallow를 사용하지 말고 mount 사용
  - 함수형 컴포넌트에서는 클래스형 컴포넌트와 달리 인스턴스 메서드 및 상태를 조회 할 방법이 없습니다. 

### 오류

 enzyme-adapter-react-16를 설치할 때

- fsevent 에 대한 오류가 발생될  yarn install을 실행시켜 버전을 업데이트 해야합니다.
  - [참고1](https://github.com/yarnpkg/yarn/issues/3926)
  - [참고2](https://github.com/fsevents/fsevents/issues/181) 
- 기존의 App.test.js는 삭제하고 `yarn test`하면 `__snapshotd__` 폴더에 `Profile.test.js.snap` 이란 스냅샷 파일이 생김. 이 이후에 Profile을 변형한 후 test하면 fail 합니다.

## 6장 @testing-library/react 를 사용한 리액트 컴포넌트 테스트

- Profile 테스트
  - 스냅샷 테스팅
- 다양한 쿼리
- 어떤 쿼리를 사용해야 할까?

쿼리의 종류가 정말 많죠? 그렇다면, 어떤 쿼리를 우선적으로 사용해야 할까요? [매뉴얼](https://testing-library.com/docs/guide-which-query) 에서는 다음 우선순위를 따라서 사용하는것을 권장하고있습니다.

그리고, DOM 의 `querySelector` 를 사용 할 수도 있는데요, 이는 지양해야합니다. 차라리 `data-testid` 를 설정하는것이 좋습니다.

```javascript
const utils = render(<MyComponent />);
const element = utils.container.querySelector('.my-class');
```

- Counter 컴포넌트 테스트 작성
  - 이벤트 다루기



## 7장  @testing-library/react를 사용하여 TDD 개발 흐름으로 TodoList 만들기

본문의 내용이 길어 줄거리는 생략합니다.



## 8장 @testing-library/react의 비동기 작업을 위한 테스트

본문의 내용이 길어 줄거리는 생략합니다. 다만 테스트시 경고나 에러가 발생했던 점을 토대로 본문의 내용을 보충합니다.

waitFor error "MutationObserver is not a constructor" with latest version 

라는 위와 같은 에러 발생시

```
yarn add jest-environment-jsdom-sixteen --dev
```

and then set it via `env` cli param

```
"scripts": {
   ...
   "test": "react-scripts test --env=jest-environment-jsdom-sixteen",
   ...
}
```

- waitFor 사용법

버전이 바뀌어 아래와 같이 바뀌게 되었습니다.

- wait -> waitFor
- waitForElement -> waitFor

- waitForDomChange -> waitFor

- waitForElementToBeRemoved -> waitForElementToBeRemoved 








- 대문자로 고쳐 써야합니다.

userProfile.js => UserProfile.js

- axios-mock-adapter 사용하기 위해서 라이브러리를 설치해야합니다.

`$ npm install axios-mock-adapter --save-dev`

