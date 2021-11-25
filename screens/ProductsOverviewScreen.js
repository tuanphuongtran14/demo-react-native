import React from "react";
import { FlatList, Button, View, Platform, StyleSheet} from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/UI/HeaderButton"
import ProductItem from "../components/shop/ProductItem";
import Colors from "../constants/Colors";

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title
    });
  };

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <View style={styles.detailBtnSection}>
            <Button
              color={Colors.primary}
              title="Xem chi tiết"
              onPress={() => {
                selectItemHandler(itemData.item.id, itemData.item.title);
              }}
            />
          </View>
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: "Tất cả sản phẩm",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  detailBtnSection: {
    width: "100%",
    justifyContent: "center",
  },
});

export default ProductsOverviewScreen;
