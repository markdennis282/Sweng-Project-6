async def add_source(url: str, tags: list[str], refresh_interval: int) -> None:
    """
    Adds a new document source.

    Preconditions: `url` is a valid URL, `tags` is not empty and contains only valid source tags, 
    `refresh_interval` is expressed in minutes.

    Throws if an error occurs while adding the document source.
    """
    pass

async def refresh_all_sources() -> None:
    """
    Requests to refresh all the document sources.
    Since refreshing may take a long time, this function returns without waiting for completion of the refresh.
    
    Throws if the refresh request can't be fulfilled.
    """
    pass
