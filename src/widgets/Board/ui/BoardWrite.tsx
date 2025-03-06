import { NavBar } from '../../NavBar';
import { Footer } from '../../Footer';
import styles from './BoardWrite.module.css';
import React, { useState } from 'react';

export const BoardWrite = () => {
  const selectCategory = ['금융', '복지', '주거', '자기 개발', '자유', 'Q&A'];
  const headCategory = [
    '월급 및 관리 및 예산',
    '세금 및 공제',
    '대출',
    '보험',
    '자산 증식',
  ];

  const categoryMapping: { [key: string]: string } = {
    금융: 'b001',
    복지: 'b002',
    주거: 'b003',
    '자기 개발': 'b004',
    자유: 'b005',
    'Q&A': 'b006',
  };

  const [categoryValue, setCategoryValue] = useState({
    category: '',
    detail: '',
  });

  const [inputValue, setInputValue] = useState({
    title: '',
    value: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryValue((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  };

  const handleBottomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryValue((prev) => ({
      ...prev,
      detail: e.target.value,
    }));
  };

  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue((prev) => ({
      ...prev,
      value: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const userData = JSON.parse(localStorage.getItem('user'));

    const boardData = JSON.stringify({
      title: inputValue.title,
      content: inputValue.value,
      boardType: categoryMapping[categoryValue.category] || '',
      category: categoryValue.detail,
      nickname: userData?.nickname || '',
      email: userData?.email || '',
    });

    const formData = new FormData();
    formData.append('board', boardData);
    formData.append('image', '');

    try {
      const response = await fetch('https://api.sabujak.life/board', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('게시글이 성공적으로 작성되었습니다.');
      } else {
        const errorData = await response.json();
        console.error('서버 응답 에러:', errorData);
        alert(`게시글 작성에 실패했습니다: ${errorData.message}`);
      }
    } catch (error) {
      console.error('API 요청 실패:', error);
      alert('게시글 작성 중 오류가 발생했습니다.');
    }
  };

  return (
    <section>
      <NavBar />
      <article className={styles.container}>
        <h1 className={styles.title}>사부작 글쓰기</h1>
        <p className={styles.subTitle}>
          작성한 게시글은 현재 사용 중인 닉네임으로 표시됩니다.
        </p>
        <select
          className={styles.select}
          name='category'
          onChange={handleChange}
          value={categoryValue.category}
        >
          <option value='' disabled>
            카테고리를 선택해주세요
          </option>
          {selectCategory.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          className={styles.bottomselect}
          name='headLine'
          onChange={handleBottomChange}
          value={categoryValue.detail}
        >
          <option value='' disabled>
            말머리 선택하기(필수)
          </option>
          {headCategory.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type='text'
          placeholder='제목을 입력해주세요'
          className={styles.inputText}
          value={inputValue.title}
          onChange={handleTitleInputChange}
        />
      </article>
      <article className={styles.bottomContainer}>
        <div className={styles.inputContainer}>
          <textarea
            className={styles.input}
            placeholder='글을 입력해주세요'
            value={inputValue.value}
            onChange={handleTextChange}
          />
        </div>
        <input
          placeholder='키워드를 입력해주세요. (최대 5개)'
          className={styles.keyword}
        />
        <p className={styles.bottomTitle}>
          온라인 글쓰기에서는 타인의 권리를 존중하며 명예훼손이 되지 않도록
          주의하세요.
        </p>
        <button className={styles.button} onClick={handleSubmit}>
          작성하기
        </button>
      </article>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </section>
  );
};
