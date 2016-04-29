var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null; //hold the object with song info
var currentAlbum = null;
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playBarPlayButton = '<span class="ion-play"></span>';
var playBarPauseButton = '<span class="ion-pause"></span>';
var $nextButton = $('.main-controls .next');
var $prevButton = $('.main-controls .previous');


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
        currentlyPlayingSongNumber = parseInt(currentlyPlayingSongNumber);
        if( songNumber !== currentlyPlayingSongNumber){
            $(this).find('.song-item-number').html(songNumber);
        }
    };
    var clickHandler = function(event){
        var songNumber = parseInt($(this).attr('data-song-number'));
        currentlyPlayingSongNumber = parseInt(currentlyPlayingSongNumber);
        
        if(currentlyPlayingSongNumber !== null ){
            var lastSong = $('.song-item-number[data-song-number =' + currentlyPlayingSongNumber + ']');
            lastSong.html(currentlyPlayingSongNumber);
        };
        
        if (currentlyPlayingSongNumber == songNumber){//pause song
            currentlyPlayingSongNumber = null;
            currentSongFromAlbum = null;
            $(this).html(playButtonTemplate);
            $('.main-controls .play-pause').html(playBarPlayButton);
        }else if (currentlyPlayingSongNumber !== songNumber){//play song
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSongNumber = songNumber;
            currentSongFromAlbum = currentAlbum.songs[songNumber-1];
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

var trackIndex = function(album, song){
    return album.songs.indexOf(song);
};
var nextSong = function(){
    var previousSongNumber = currentlyPlayingSongNumber;
    var currentIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    if (currentIndex >= currentAlbum.songs.length - 1){
        currentIndex = -1;
    }
    currentSongFromAlbum = currentAlbum.songs[currentIndex+1]; //count from 0
    currentlyPlayingSongNumber = currentIndex+2;//count from 1
    updatePlayerBarSong();
    var lastSong = $('.song-item-number[data-song-number='+ previousSongNumber + ']');
    lastSong.html(previousSongNumber);
    var currentSong = $('.song-item-number[data-song-number='+ currentlyPlayingSongNumber + ']');
    currentSong.html(pauseButtonTemplate);    
};

var previousSong = function(){
    var previousSongNumber = currentlyPlayingSongNumber;
    var currentIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    if (currentIndex <= 0){
        currentIndex = currentAlbum.songs.length;
    }
    console.log("currentIndex = " + currentIndex);
    currentSongFromAlbum = currentAlbum.songs[currentIndex-1]; //count from 0
    currentlyPlayingSongNumber = currentIndex;//count from 1
    console.log("currentlyPlaying Song number = " + currentlyPlayingSongNumber);
    updatePlayerBarSong();
    var lastSong = $('.song-item-number[data-song-number='+ previousSongNumber + ']');
    lastSong.html(previousSongNumber);
    var currentSong = $('.song-item-number[data-song-number='+ currentlyPlayingSongNumber + ']');
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

//$(document).ready(function(){
    setCurrentAlbum(albumMarconi);
    
    $nextButton.click(nextSong);
    $prevButton.click(previousSong);
//});

