export default function flatListToHierarchical(
  data = [],
  { idKey = 'id', parentKey = 'parentId', childrenKey = 'children' } = {}
) {
  const tree = [];
  const childrenOf = {};

  data.forEach((item) => {
    const newItem = { ...item };
    const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;

    childrenOf[id] = childrenOf[id] || [];
    newItem[childrenKey] = childrenOf[id];
    childrenOf[parentId] = childrenOf[parentId] || [];

    parentId
      ? (childrenOf[parentId]).push(newItem)
      : tree.push(newItem);
  });

  return tree;
}
