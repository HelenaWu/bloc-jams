var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null; //hold the object with song info
var currentAlbum = null;
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playBarPlayButton = '<span class="ion-play"></span>';
var playBarPauseButton = '<span class="ion-pause"></span>';
var $nextButton = $('.main-controls .next');
var $prevButton = $('.main-controls .previous');

var setSong = function(songNumber){
    songNumber = parseInt(songNumber);
    currentlyPlayingSongNumber = songNumber;
    currentSongFromAlbum = getAlbumSong(songNumber);
};
var getAlbumSong = function(number){
    return currentAlbum.songs[number-1];
};
var trackIndex = function(album, song){
    return album.songs.indexOf(song);
};
var getSongNumberCell = function(number){
    return $('.song-item-number[data-song-number =' + number + ']');
};

var createSongRow = function(songNumber, songName, songLength){
    var template = 
        '<tr class="album-view-song-item">' + 
        '   <td class="song-item-number" data-song-number="' + songNumber + '">'+ songNumber + '</td>' + 
        '   <td class="song-item-title">' + songName + '</td>' + 
        '   <td class="song-item-duration">'+ songLength + '</td>' + 
        ' </tr>';
    var $row = $(template);
    var onHover = function(){
        var songNumber = parseInt($(this).find('.song-item-number').attr('data-song-number'));
        currentlyPlayingSongNumber = parseInt(currentlyPlayingSongNumber);
        
        if( songNumber !== currentlyPlayingSongNumber
           && ! isNaN(currentlyPlayingSongNumber)
          ){
            $(this).find('.song-item-number').html(playButtonTemplate);
        };
    };
    var offHover = function(){
        var songNumber = parseInt($(this).find('.song-item-number').attr('data-song-number'));  
        if( songNumber !== parseInt(currentlyPlayingSongNumber)){
            $(this).find('.song-item-number').html(songNumber);
        }
    };
    var clickHandler = function(event){
        var songNumber = parseInt($(this).attr('data-song-number'));
        currentlyPlayingSongNumber = parseInt(currentlyPlayingSongNumber);
        
        if(currentlyPlayingSongNumber !== null ){
            var lastSong = getSongNumberCell(currentlyPlayingSongNumber);
            lastSong.html(currentlyPlayingSongNumber);
        };
        
        if (currentlyPlayingSongNumber == songNumber){//pause song
            currentlyPlayingSongNumber = null;
            currentSongFromAlbum = null;
            $(this).html(playButtonTemplate);
            $('.main-controls .play-pause').html(playBarPlayButton);
        }else if (currentlyPlayingSongNumber !== songNumber){//play song
            $(this).html(pauseButtonTemplate);
            setSong(songNumber);
            updatePlayerBarSong();
        };
    };
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;    
}

var setCurrentAlbum = function(album){
    currentAlbum = album;
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

var nextSong = function(event){
    var direction = event.data.direction;
    var previousSongNumber = currentlyPlayingSongNumber;
    var currentIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    
    if (direction === "next" && currentIndex >= currentAlbum.songs.length - 1){
        currentIndex = -1;
    }else if (direction === "prev" && currentIndex <= 0){
        currentIndex = currentAlbum.songs.length;
    }
    direction === "next"? setSong(currentIndex+2):setSong(currentIndex);  updatePlayerBarSong();
    var lastSong = getSongNumberCell(previousSongNumber);
    lastSong.html(previousSongNumber);
    var currentSong = getSongNumberCell(currentlyPlayingSongNumber);
    currentSong.html(pauseButtonTemplate);    
};

var updatePlayerBarSong = function(){
    var $songName = $('.song-name');
    var $songNameMobile = $('.artist-song-mobile');
    var $artist = $('.artist-name');
    $songName.html(currentSongFromAlbum.title);
    $songNameMobile.html(currentSongFromAlbum.title);
    $artist.html(currentAlbum.artist);
    $('.main-controls .play-pause').html(playBarPauseButton);
};

$(document).ready(function(){
    setCurrentAlbum(albumMarconi);

    $nextButton.click({direction: "next"},nextSong);
    $prevButton.click({direction: "prev"}, nextSong);
});
