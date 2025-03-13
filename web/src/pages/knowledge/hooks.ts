import { KnowledgeRouteKey } from '@/constants/knowledge';
import { useSetModalState } from '@/hooks/common-hooks';
import { useCreateKnowledge } from '@/hooks/knowledge-hooks';
import { useCallback, useState } from 'react';
import { useNavigate } from 'umi';

export const useSearchKnowledge = () => {
  const [searchString, setSearchString] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };
  return {
    searchString,
    handleInputChange,
  };
};

/**
 * 创建知识库的时候
 * @returns
 */
export const useSaveKnowledge = () => {
  const { visible: visible, hideModal, showModal } = useSetModalState();
  //创建知识库的api
  const { loading, createKnowledge } = useCreateKnowledge();
  const navigate = useNavigate();

  const onCreateOk = useCallback(
    // 知识库的名字
    async (name: string) => {
      const ret = await createKnowledge({
        name,
      });
      // KnowledgeRouteKey 枚举了进入知识库的方式
      if (ret?.code === 0) {
        hideModal();
        navigate(
          `/knowledge/${KnowledgeRouteKey.Configuration}?id=${ret.data.kb_id}`,
        );
      }
    },
    [createKnowledge, hideModal, navigate],
  );

  return {
    loading,
    onCreateOk,
    visible,
    hideModal,
    showModal,
  };
};
