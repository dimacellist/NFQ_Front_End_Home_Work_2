import React from 'react';
import Card from './Card';
import Navigation from './Navigation';
import axios from 'axios';
import {endpoints, getImageUrl} from '../config';
class  App extends React.Component{


    constructor() {
        super();

        this.state = {
            list: [],
            genres: [],
        };
    }   
    
    /*Wanted to add another axios request, 
    but found this info: 
    "You should never be calling this.setState
    more than once in a given thread of execution within a component",
    So decided to use componentwillmount method and call second axios
    call there. 
    
    Also found this usefull info, but do not know if applicable here:
    https://stackoverflow.com/questions/53964846/handling-multiple-axios-get-requests-inside-componentdidmount
    */
    componentDidMount() {
        axios
            .get(endpoints.mostPopularMovies())
            .then((data) => {
                this.setState({
                    list: data.data.results,
                });
            });
    }

    componentWillMount() {
        axios
            .get(endpoints.genres())
            .then((data) => {
                this.setState({
                    genres: data.data.genres,
                })
            })
    }

    genreChange(id) {
        axios
            .get(endpoints.genreMovies(id))
            .then((data) => {
                this.setState({
                    list: data.data.results,
                })
            })
    }

    render() {

        return (
            <div>
                <nav>
                    <div className="navWide">
                        <div className="wideDiv">
                            {this.state.genres.map((navigation) => (
                                <Navigation
                                    key={navigation.id} 
                                    id={navigation.id}
                                    name={navigation.name}
                                    handler={this.genreChange.bind(this)}
                                />
                            ))}
                        </div>
                    </div>
                </nav>
              {this.state.list.map((card) => (
                  <Card
                      key={card.id}
                      title={card.original_title}
                      backgroundImage={getImageUrl(card.backdrop_path)}
                      data={card.release_date}
                      voteAverage={card.vote_average}
                      voteCount={card.vote_count}
                      description={card.overview}
                  />
              ))}
            </div>
        );
    }
}

export default App;
