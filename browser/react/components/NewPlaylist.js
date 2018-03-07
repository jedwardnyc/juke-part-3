import React from 'react';

const NewPlaylist = (props) =>{
  return (
    <div className="well">
      <form onSubmit={props.onSubmit} className="form-horizontal">
        <fieldset >
          <legend>New Playlist</legend>
          <div className="form-group">
            <label className="col-xs-2 control-label">Name</label>
            <div className="col-xs-10">
              <input value={props.value} onChange={props.onChange} className="form-control" type="text"/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-10 col-xs-offset-2">
              <button disabled={!props.value.length || props.value.length > 15} type="submit" className="btn btn-success">Create Playlist</button>
              {
                (!props.value.length) ? <div> <br /> <div className="alert alert-warning">Please enter a name</div> </div> : null
              }

              {
                (props.value.length > 16) ? <div> <br /> <div className="alert alert-warning">That name is too long!</div> </div> : null
              }
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  )
}

export default NewPlaylist;