import React, { Component } from 'react';
import { FlatList } from 'react-native';

import Loading from '../../Components/LoadingComponent/Loading';
import CardSurahList from '../../Components/CardSurahList/CardSurahList.component';
import { Routes } from '../../Navigation/Routes';
import { keyExtractor } from '../../Utils/Helper';

class QuranList extends Component {
  componentDidMount() {
    this.getDataQuran();
  }

  getDataQuran = async () => {
    const { getQuranList } = this.props;
    await getQuranList();
  };

  goToDetailpage = dataSurah => () => {
    const { navigation } = this.props;
    navigation.navigate(Routes.QuranDetail, { dataSurah });
  };

  renderCardContent = ({ item }) => {
    return (
      <CardSurahList
        surahNumber={item?.id}
        surahText={item?.surat_text}
        surahName={item?.surat_name}
        surahMean={item?.surat_terjemahan}
        surahAyat={item?.count_ayat}
        onPress={this.goToDetailpage(item)}
      />
    );
  };

  render() {
    const { dataQuran, isLoading, refreshing } = this.props;

    return isLoading ? (
      <Loading />
    ) : (
      <FlatList
        data={dataQuran}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        renderItem={this.renderCardContent}
        refreshing={refreshing}
        onRefresh={this.getDataQuran}
      />
    );
  }
}

export default QuranList;