import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { ArtistRenderItem } from './components/ArtistRenderItem'


const ArtistQuery = gql`
    query Artists($artistName: String) {
        queryArtists(byName:$artistName) {
            name
            id
            image
          }
    }
`

class HomeScreen extends Component {
    render() {

        console.log(this.props)
        const { queryArtists, refetch, loading } = this.props.data

        if (loading) {
            return (
                <ActivityIndicator style = { styles.activityIndicator }/>
            )
        } else {

            return (
                <View style={styles.container}>
                    <TextInput
                        style={styles.searchBox}
                        placeholder="Ingresa el nombre de un artista"
                        onChangeText={artist => refetch({ artistName: artist.length > 0 ? artist : " " })}
                    />
                    <FlatList
                        data={queryArtists}
                        renderItem={({ item }) => ArtistRenderItem(item)}
                        keyExtractor={this.keyExtractor}
                        ListEmptyComponent={<View><Text>No se ha encontrado ningun artista.</Text></View>}
                    />
                </View>
            )
        }
    }

    keyExtractor = item => item.id
}

const ArtistQueryExecutor = graphql(ArtistQuery, {
    options: props => ({
        variables: { artistName: props.artist }
    })
})


styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        alignItems: 'center',
    },
    searchBox: {
        width: '90%',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
    }
})

HomeScreen = (ArtistQueryExecutor)(HomeScreen)
export default HomeScreen