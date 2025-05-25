import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import data from '@/data/data.json';
import styles from './style.module.css';
import Header from '@/components/Header';
import ColorThief from 'colorthief';
import { brightenColor } from '@/utils/colors';
import { FaDownload, FaShare, FaCopy } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { showToast } from '@/utils/toast';
import 'react-toastify/dist/ReactToastify.css';

const ImageDetail: React.FC = () => {
  const { id } = useParams();
  const image = data.images[Number(id)];
  const [bgColor, setBgColor] = useState('rgb(255, 255, 255)');

  useEffect(() => {
    const img = new Image();
    img.src = `/src/assets/${image.file}`;
    img.onload = () => {
      const colorThief = new ColorThief();
      const [r, g, b] = colorThief.getColor(img);
      const [newR, newG, newB] = brightenColor([r, g, b]);
      setBgColor(`rgb(${newR}, ${newG}, ${newB})`);
    };
  }, [image.file]);

  if (!image) {
    return <div>이미지를 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.container} style={{ backgroundColor: bgColor }}>
      <Header />
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <img src={`/src/assets/${image.file}`} alt={image.prompt} />
        </div>
        <div className={styles.imageDescription}>
          <h1>Title</h1>
          <p>{image.title}</p>
          <h1>Model</h1>
          <p>{image.model}</p>
          <h1>Author</h1>
          <p>{image.author}</p>

          <div className={styles.imageActionsWrapper}>
            <div className={styles.iconBtn}>
              <FaDownload /> <span>Download Image</span>
            </div>
            <div className={styles.iconBtn}>
              <FaShare /> <span>Share</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.imagePrompt}>
        <div className={styles.promptHeader}>
          <h1>Prompt</h1>
          <div className={styles.iconBtn} onClick={() => {
            navigator.clipboard.writeText(image.prompt);
            showToast('Prompt has been copied!', 'success');
          }}>
            <FaCopy /> <span>Copy</span>
          </div>
        </div>
        <p>{image.prompt}</p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ImageDetail;
