## What?

The Cloudsultation project is a simple web application which you can use to find the best cloud service for your next project.

Many cloud services have situations in which they are better used that other, and many more have situations in which they are unusable.

For example (a very basic one) - an Azure load balancer can not be used to balance traffic by URL and therefore you would not use it in a project that requires that.

## How

It was build using [Next.js](https://nextjs.org/), [Chakra UI](next.chakra-ui.com/) and [React Query](https://react-query.tanstack.com/) and is deployed on [Vercel](https://vercel.com/).

## What's next

**Your turn!**

In order to make this app useful, I need your expertise. 

Although I know a bit about some cloud services, I am not an expert in all of them.

The project is open to pull requests with additional services and situations in which to use, or not used them.

To do so:

1. Check the services.json file in the data folder
2. Add a new service to the list OR
3. Modify an existing service
4. Create a pull request
5. Discuss
6. Merge!

If you can't find a good icon for the service, don't worry, we'll handle that for you.


## TODO

- [x] Implement fuzzy search (fuse.js?)
- [x] Search through pros and cons as well
- [ ] Add search hotkey ("/" seems to be standard these days)
- [ ] Add filtering by cloud provider (Tabs under search textbox?)
- [ ] Add a suggestion feature - we'll need a backend for that? Maybe just use the next js API feature and store data to a free db, mongo atlas maybe has a free tier? Maybe I can just use github as a backend - pull requests.
- [ ] Add highlighting after searching (see fusejs - includeMatches)
- [ ] Optional: serialize the index to fs and load on startup