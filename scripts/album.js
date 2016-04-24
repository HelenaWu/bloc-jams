var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso', 
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Blue', duration: '4:26'},
        { title: 'Green', duration: '3:14'},
        { title: 'Red', duration: '5:01'},
        { title: 'Pink', duration: '3:21'},
        { title: 'Magenta', duration: '2:15'}        
    ]
};
var albumKanye = {
    title: 'The Life of Pablo',
    artist: 'Kanye West', 
    label: 'GOOD Music',
    year: '2016',
    albumArtUrl: 'assets/images/album_covers/03.png',
    songs: [
        { title: 'Ultra Light Beam', duration: '5:20'},
        { title: 'Father Stretch My Hands', duration: '2:15'},
        { title: 'Famous', duration: '3:14'},
        { title: 'Feedback', duration: '2:35'},
        { title: 'Low Lights', duration: '2:11'}        
    ]
};
var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator?', duration: '1:01'},        
        { title: 'Ring, ring, ring', duration: '5:01'},        
        { title: 'Fits in your pocket', duration: '3:21'},
        { title: 'Can you hear me now?', duration: '3:14'},
        { title: 'Wrong phone number', duration: '2:15'}        
    ]
};
var currentlyPlayingSong = null;
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var createSongRow = function(songNumber, songName, songLength){
    var template = 
        '<tr class="album-view-song-item">' + 
        '   <td class="song-item-number" data-song-number="' + songNumber + '">'+ songNumber + '</td>' + 
        '   <td class="song-item-title">' + songName + '</td>' + 
        '   <td class="song-item-duration">'+ songLength + '</td>' + 
        ' </tr>';
    var $row = $(template);
    var onHover = function(){
        if($(this).find('.song-item-number').attr('data-song-number') !== currentlyPlayingSong){
            $(this).find('.song-item-number').html(playButtonTemplate);
        }
    };
    var offHover = function(){
        var $songNumber = $(this).find('.song-item-number').attr('data-song-number');  
        if( $songNumber !== currentlyPlayingSong){
            $(this).find('.song-item-number').html($songNumber);
        }
    };
    var clickHandler = function(){
        var $songNumber = $(this).attr('data-song-number');

        if(currentlyPlayingSong !== null){
            var lastSong = $('.song-item-number[data-song-number =' + currentlyPlayingSong + ']');
            lastSong.html(currentlyPlayingSong);
        };
        
        if (currentlyPlayingSong === $songNumber){
            currentlyPlayingSong = null;
            $(this).html(playButtonTemplate);

        }else{
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSong = $songNumber;
        };
    };
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;    
}

var setCurrentAlbum = function(album){
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    
    $albumSongList.empty();
    for (var i=0; i < album.songs.length; i++){
        var $newRow = createSongRow(i+1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};



$(document).ready(function(){
    setCurrentAlbum(albumMarconi);
});

