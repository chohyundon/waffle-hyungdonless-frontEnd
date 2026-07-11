'use client';

import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import styles from '@/components/Board/styles/BoardWrite.module.css';
import { useBoardWrite } from '@/components/Board/useBoardWrite';
import Image from 'next/image';
import cameraIcon from '@/assets/icons/camera.svg';

export const BoardWrite = () => {
  const {
    selectCategory,
    headCategory,
    categoryValue,
    inputValue,
    handleChange,
    handleBottomChange,
    handleTitleInputChange,
    handleTextChange,
    handleSubmit,
    image,
    imagePreviewUrl,
    isDraggingImage,
    fileInputRef,
    formatFileSize,
    handleImageChange,
    handleImageRemove,
    openImagePicker,
    handleImageDragOver,
    handleImageDragLeave,
    handleImageDrop,
  } = useBoardWrite();

  return (
    <section>
      <NavBar />
      <article className={styles.container}>
        <h1 className={styles.title}>사부작 글쓰기</h1>
        <p className={styles.subTitle}>
          작성한 게시글은 현재 사용 중인 닉네임으로 표시됩니다.
        </p>
        <select
          id='board-category'
          className={styles.select}
          name='category'
          onChange={(e) => handleChange(e.target.value)}
          value={categoryValue.category}
          aria-label='카테고리'
        >
          <option value='' disabled>
            카테고리를 선택해주세요
          </option>
          {selectCategory.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          id='board-headline'
          className={styles.bottomselect}
          name='headLine'
          onChange={(e) => handleBottomChange(e.target.value)}
          value={categoryValue.detail}
          aria-label='말머리'
        >
          <option value='' disabled>
            말머리 선택하기(필수)
          </option>
          {headCategory.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          id='board-title'
          type='text'
          placeholder='제목을 입력해주세요'
          className={styles.inputText}
          value={inputValue.title}
          onChange={(e) => handleTitleInputChange(e.target.value)}
          aria-label='제목'
        />
      </article>
      <article className={styles.bottomContainer}>
        <div className={styles.inputContainer}>
          <textarea
            id='board-content'
            className={styles.input}
            placeholder='글을 입력해주세요'
            value={inputValue.value}
            onChange={(e) => handleTextChange(e.target.value)}
            aria-label='내용'
          />
        </div>

        <section className={styles.imageUploadSection} aria-label='이미지 첨부'>
          <div className={styles.imageUploadHeader}>
            <h2 className={styles.imageUploadTitle}>이미지 첨부</h2>
            <span className={styles.imageUploadOptional}>선택</span>
          </div>

          <input
            ref={fileInputRef}
            id='board-image-input'
            type='file'
            className={styles.imageInputHidden}
            onChange={handleImageChange}
            accept='image/jpeg,image/png,image/webp,image/gif'
            tabIndex={-1}
          />

          {!image ? (
            <button
              type='button'
              className={`${styles.imageDropzone} ${isDraggingImage ? styles.imageDropzoneActive : ''}`}
              onClick={openImagePicker}
              onDragOver={handleImageDragOver}
              onDragLeave={handleImageDragLeave}
              onDrop={handleImageDrop}
              aria-label='이미지 선택 또는 드래그하여 추가'
            >
              <span className={styles.imageDropzoneIcon}>
                <Image
                  src={cameraIcon}
                  alt='이미지 첨부 아이콘'
                  width={28}
                  height={28}
                />
              </span>
              <span className={styles.imageDropzoneText}>
                클릭하거나 이미지를 여기로 끌어다 놓으세요
              </span>
              <span className={styles.imageDropzoneHint}>
                JPG, PNG, WEBP, GIF · 최대 5MB
              </span>
            </button>
          ) : (
            <div className={styles.imagePreviewCard}>
              {imagePreviewUrl && (
                <img
                  src={imagePreviewUrl}
                  alt='선택한 이미지 미리보기'
                  className={styles.imagePreview}
                />
              )}
              <div className={styles.imagePreviewMeta}>
                <p className={styles.imagePreviewName}>{image.name}</p>
                <p className={styles.imagePreviewSize}>
                  {formatFileSize(image.size)}
                </p>
              </div>
              <div className={styles.imagePreviewActions}>
                <button
                  type='button'
                  className={styles.imageChangeButton}
                  onClick={openImagePicker}
                >
                  변경
                </button>
                <button
                  type='button'
                  className={styles.imageRemoveButton}
                  onClick={handleImageRemove}
                  aria-label='선택한 이미지 삭제'
                >
                  삭제
                </button>
              </div>
            </div>
          )}
        </section>

        <input
          placeholder='키워드를 입력해주세요. (최대 5개)'
          className={styles.keyword}
          aria-label='키워드'
        />
        <p className={styles.bottomTitle}>
          온라인 글쓰기에서는 타인의 권리를 존중하며 명예훼손이 되지 않도록
          주의하세요.
        </p>
        <button type='button' className={styles.button} onClick={handleSubmit}>
          작성하기
        </button>
      </article>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </section>
  );
};
